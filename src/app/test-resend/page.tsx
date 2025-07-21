"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestResendPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const testEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || "delivered@resend.dev" }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Unknown error" });
    }
    setLoading(false);
  };

  const checkDebug = async () => {
    try {
      const response = await fetch("/api/debug");
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Resend Email Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <Button onClick={checkDebug} className="mb-4">
          Check Environment
        </Button>
        {debugInfo && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Send Test Email</h2>
        <div className="flex gap-2 mb-4">
          <Input
            type="email"
            placeholder="Enter email (or leave empty for default)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={testEmail} disabled={loading}>
            {loading ? "Sending..." : "Send Test"}
          </Button>
        </div>
        {result && (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}