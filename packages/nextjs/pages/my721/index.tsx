import { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const MyErc721: NextPage = () => {
  const { data } = useScaffoldContractRead({
    contractName: "MyErc721",
    functionName: "getAllTokenUrls",
  });
  const totalToken: any = data;

  const [tokenUrl, setTokenUrl] = useState<string>();
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "MyErc721",
    functionName: "mintNft",
    args: [tokenUrl],
    blockConfirmations: 1,
  });

  const mintNft = () => {
    tokenUrl ? writeAsync() : "";
  };

  const renderTokenGird = () => {
    if (totalToken && totalToken.length > 0) {
      const tokenUrls = totalToken[1];
      return tokenUrls.map((tokenUrl: any, id: number) => {
        return <Image key={id} className="" alt="" src={tokenUrl} width={300} height={250} />;
      });
    }
  };

  return (
    <>
      <div className="mt-10 flex justify-center">
        <InputBase name="url" placeholder="url" value={tokenUrl} onChange={setTokenUrl} />
        <button onClick={mintNft} className="ml-2 pr-4 pl-4 bg-sky-500/100 hover:bg-cyan-600  rounded-full">
          MintNft
        </button>
      </div>
      <div className="p-10 grid grid-cols-4 gap-10 place-items-center">{renderTokenGird()}</div>
    </>
  );
};

export default MyErc721;
