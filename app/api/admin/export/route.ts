import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!verifyAdminAuth(request)) {
      return unauthorizedResponse();
    }

    // Check Supabase configuration
    if (!isSupabaseConfigured()) {
      return new NextResponse('Базата данни не е конфигурирана', { status: 503 });
    }

    console.log('📥 Admin: Exporting all entries to CSV');

    // Fetch all entries
    const { data: entries, error } = await supabaseAdmin
      .from('giveaway_entries')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching entries for export:', error);
      return new NextResponse('Грешка при експорт', { status: 500 });
    }

    // Convert to CSV format
    const csvHeaders = [
      'ID',
      'Entry ID',
      'Име',
      'Email',
      'Телефон',
      'Продукти',
      'Facebook',
      'Instagram',
      'Споделяне',
      'Брой споделяния',
      'Препоръчан от',
      'Брой препоръки',
      'Бонус участия от препоръки',
      'Общо участия',
      'IP Адрес',
      'User Agent',
      'Дата на регистрация',
    ];

    const csvRows = entries?.map((entry) => {
      // Calculate total entries
      const taskEntries =
        (entry.task_facebook ? 1 : 0) + (entry.task_instagram ? 1 : 0) + (entry.task_share ? 1 : 0);
      const totalEntries = 1 + taskEntries + (entry.referral_entries || 0);

      // Parse selected products
      let products = '';
      try {
        const productsArray = JSON.parse(entry.selected_products || '[]');
        products = productsArray.join(', ');
      } catch (e) {
        products = entry.selected_products || '';
      }

      return [
        entry.id,
        entry.entry_id,
        `"${entry.name}"`, // Wrap in quotes in case of commas
        entry.email,
        entry.phone,
        `"${products}"`,
        entry.task_facebook ? 'Да' : 'Не',
        entry.task_instagram ? 'Да' : 'Не',
        entry.task_share ? 'Да' : 'Не',
        entry.share_count || 0,
        entry.referred_by || '',
        entry.referral_count || 0,
        entry.referral_entries || 0,
        totalEntries,
        entry.ip_address || '',
        `"${entry.user_agent || ''}"`,
        new Date(entry.submitted_at).toLocaleString('bg-BG'),
      ].join(',');
    });

    // Combine headers and rows
    const csvContent = [csvHeaders.join(','), ...(csvRows || [])].join('\n');

    // Add BOM for proper UTF-8 encoding in Excel
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    console.log(`✅ Exported ${entries?.length || 0} entries to CSV`);

    // Return CSV file
    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="bacho-iliya-giveaway-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('❌ CSV export error:', error);
    return new NextResponse('Грешка при експорт', { status: 500 });
  }
}
