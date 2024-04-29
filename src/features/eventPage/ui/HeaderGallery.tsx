import { ReactElement } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

interface IGallery {
  image_url: string;
  gallery: string[];
}

export function HeaderGallery({image_url, gallery}: IGallery): ReactElement {
  const galleryPresented = gallery && gallery.length > 0;
  const imageSrcRoot = "https://storage.googleapis.com/meetups-dev/media/"

  const imgs = [image_url, ...gallery].map((v, i) => <div key={i}><img src={`${imageSrcRoot}${v}`} /></div>);

  return (
      <div className="h-full rounded-r-[10px] shrink-0 w-[690px]">
          {galleryPresented?
              <Carousel dynamicHeight={false} className="h-full" showThumbs={true} showIndicators={false} infiniteLoop>
                  {imgs}
              </Carousel> :
              <img src={`${imageSrcRoot}${image_url}`}
                alt="Event Image" className="object-cover object-center w-full h-full rounded-r-[10px]"/>
          }
      </div>
  )
}
