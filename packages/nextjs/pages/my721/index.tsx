import Image from "next/image";
import { NextPage } from "next";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const MyErc721: NextPage = () => {
  const { data } = useScaffoldContractRead({
    contractName: "MyErc721",
    functionName: "getAllTokenUrls",
  });
  const totalToken: any = data;

  const renderTokenGird = () => {
    if (totalToken && totalToken.length > 0) {
      const tokenUrls = totalToken[1];
      return tokenUrls.map((tokenUrl: any, id: number) => {
        return <Image key={id} className="" alt="" src={tokenUrl} width={350} height={200} />;
      });
    }
    return <div>123</div>;
  };

  return (
    <>
      <div className="p-10 grid grid-cols-4 gap-10 place-items-center">{renderTokenGird()}</div>
    </>
  );
};

export default MyErc721;
