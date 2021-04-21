import Image from "next/image";

const image = ({ name }) => {
  return <Image src={`/${name}.png`} alt="me" width={64} height={64} />;
};

export default image;
