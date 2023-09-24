import { BOARD_STYLES } from "../components/board/style";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/generated/deployedContracts";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const CHAIN_ID = 31337;

const Board: NextPage = () => {
  const { address } = useAccount();

  const { data: hotels } = useScaffoldContractRead({
    contractName: "OnChainBoardGame",
    functionName: "getHotels",
  });

  const { data: you } = useScaffoldContractRead({
    contractName: "OnChainBoardGame",
    functionName: "player",
    args: [address],
  });

  const { writeAsync: createAccount } = useScaffoldContractWrite({
    contractName: "OnChainBoardGame",
    functionName: "createTokenBoundAccount",
    args: [
      deployedContracts[CHAIN_ID][0].contracts.ERC6551Account.address,
      BigInt("1"),
      deployedContracts[CHAIN_ID][0].contracts.OnChainBoardGame.address,
      BigInt("1"),
      "0x",
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: roll } = useScaffoldContractWrite({
    contractName: "OnChainBoardGame",
    functionName: "moveNFT",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: buyHotel } = useScaffoldContractWrite({
    contractName: "OnChainBoardGame",
    functionName: "buyHotel",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: upgradeHotel } = useScaffoldContractWrite({
    contractName: "OnChainBoardGame",
    functionName: "upgradeHotel",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <div className="flex flex-col items-center">
          <h2 className="mt-4 text-3xl">Actions</h2>
          <button
            className="py-2 px-16 mt-2 mb-3 bg-blue-400 rounded baseline hover:bg-blue-300 disabled:opacity-50"
            style={{ width: "340px" }}
            onClick={() => roll()}
          >
            Roll
          </button>
          <button
            className="py-2 px-16 mb-3  bg-blue-400 rounded baseline hover:bg-blue-300 disabled:opacity-50"
            style={{ width: "340px" }}
            onClick={() => buyHotel()}
          >
            Buy Hotel
          </button>
          <button
            className="py-2 px-16 mb-3 bg-blue-400 rounded baseline hover:bg-blue-300 disabled:opacity-50"
            style={{ width: "340px" }}
            onClick={() => createAccount()}
          >
            Create Token Bound Account
          </button>
          <button
            className="py-2 px-16 mb-3  bg-blue-400 rounded baseline hover:bg-blue-300 disabled:opacity-50"
            style={{ width: "340px" }}
            onClick={() => upgradeHotel()}
          >
            Upgrade Hotel
          </button>
        </div>
        <div className="relative mt-16" style={{ width: "450px", height: "600px" }}>
          {hotels &&
            hotels.map((item, index) => (
              <div
                key={index}
                className={
                  "w-20 h-20 border border-gray-300 font-bold bg-white" + " " + BOARD_STYLES[index] || "grid-1"
                }
              >
                {item.id.toString()}
                {you?.toString() === item.id.toString() && <p className="my-0">You</p>}
                {item.owner !== "0x0000000000000000000000000000000000000000" && <Address address={item.owner} />}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Board;
