export type CategoryResponse = {
  data: {
    category: {
      frontPage: CarouselSection[];
    };
  };
};

export type CarouselSection = {
  header: string;
  data: CarouselItem[];
  highTimeline: boolean;
};

export type PhotoType = {
  url: string;
};

export type PhotoTypes = {
  [type: string]: PhotoType;
};

export type VerticalPhoto = {
  photoTypes: PhotoTypes;
};

export type CarouselItem = {
  id: number;
  link: string;
  alt: string;
  img: string;
  heading: string;
  subHeading: string;
  fancyUrl: string;
  canonicalUrl: string;
  verticalPhotos: {
    [index: number]: VerticalPhoto;
  };
};
