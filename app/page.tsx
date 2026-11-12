import Navbar from "@/components/NavBar";
import VaultBalance from "@/components/VaultBalance";
import UserBalance from "@/components/UserBalance";
import Deposit from "@/components/Deposit";
import Withdraw from "@/components/withdraw";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home(){
  return (
    <>
    <Navbar />
    <main className="mx-auto max-w-7xl space-y-10 p-8">
    <section>
      <h1 className="text-4l font-bold">
        Welcome to Mini DeFi Vault
      </h1>
      <p className="mt-2  text-gray-600">
        Deposit ETH securely into a decentralized valut and withdraw it whenever you need it.
      </p>
    </section>
    <section className="grid gap-6 md:grid-col-2">
      <VaultBalance />
      <UserBalance />
    </section>
    <section id="deposit" className="grid gap-6 md:grid-cols-2">
      <Deposit />
      <div id="withdraw">
        <Withdraw />
      </div>
    </section>
    <section id="History" >
      <TransactionHistory />
    </section>
    </main>
    </>
  );
}