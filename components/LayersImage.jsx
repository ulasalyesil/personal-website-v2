import React from 'react'
import Image from 'next/image'

export default function LayersImage(props) {

    const url = props.url;
  return (
    <Image 
        src={url}
        alt="Picture of the author"
        width={500}
        height={500}
        layout='responsive'
    />
  )
}
