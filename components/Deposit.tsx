"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { getVaultWriteContract } from "@/lib/contract";

export default function Deposit() {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

const handleDeposit = async () =>{
    try{
        if (!amount || Number(amount) <= 0) {
            alert("Enter a valid ETH amount.");
            return;
        }
        setLoading(true);
        setStatus("Connecting to contract...");
    const contract = await getVaultWriteContract();
    setStatus("Waiting for wallet confirmation...");
    const tx = await contract.deposit({
        value: ethers.parseEther(amount),
    });
    setStatus("Transaction submitted...");
    await tx.wait();
    setStatus("✅ Deeposit successful");   
    setAmount("");
} catch (error:any) {
    console.error(error);
    if (error.shortMessage) {
        setStatus(error.shortMessage);
    } else {
    setStatus("Transaction failed.");
    }
} finally {
    setLoading(false); 
    }
    
}

return (
    <div className="max-w-md rounded-lg border p-5 shallow-md bg-white">
    <h2 className="mb-4 text-2xl font-bold">
     Deposit ETH
    </h2>
    <input type="number" step="0.001" min="0" placeholder="0.01" value={amount} onChange={(e)=> setAmount(e.target.value)} className="mb-4 w-full rounded border p-2" />
    <button onClick={handleDeposit} disabled={loading} className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400">
        {loading ? "Deposition...":"Deposit"}
    </button>
    { status && (
<p className="mt-4 text-sm text-gray-700">{status} </p>
    )}

    </div>   
);
}