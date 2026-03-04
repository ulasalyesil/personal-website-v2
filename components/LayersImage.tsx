import Image from 'next/image';

interface LayersImageProps {
  url: string;
}

export default function LayersImage({ url }: LayersImageProps) {
  return (
    <Image
      src={url}
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
}
