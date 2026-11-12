"use client";

import { useEffect, useState } from "react"
import { ethers } from "ethers";
import { getVaultReadContract } from "@/lib/contract";

export default function VaultBalance(){
    const [balance, setBalance] = useState("0");
    const [loading, setLoading] = useState(true);

    const loadBalance = async () => {
        try{
            const contract = getVaultReadContract();
            console.log("Contract target:", contract.target);
            const provider = contract.runner as ethers.Provider;
            console.log("Network", await provider.getNetwork());
            const code = await provider.getCode(contract.target);
            console.log("Code:", code);
            const vaultBalance = await contract.contractBalance();
            console.log("Vault balance:", vaultBalance.toString());
            setBalance(ethers.formatEther(vaultBalance));
        } catch (err){
            console.error("Error loading vault balance", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect (()=>{
        loadBalance();
// Refresh every 10 seconds
const interval = setInterval(loadBalance, 10000);
return ()=> clearInterval(interval);
    }, [] );
    return  (
        <div className="rounded-lg border bg-white p-6 shadow-md">
            <h2 className="mb-2 text-xl font-bold"> Vault Balance </h2>
            { loading? (
                <p> Loading...</p>
            ) : (
            <>
            <p className="text-4xl font-bold text-blue-600">
                {Number(balance).toFixed(4)} ETH
            </p>
            <p className="mt-4 text-sm text-gray-500">
                Total ETH locked in the Vault.
            </p>
            <button onClick={loadBalance} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Refresh
            </button>
            </>
            )
    }
        </div>
    );
}