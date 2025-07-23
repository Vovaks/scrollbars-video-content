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

export type CarouselItem = {
  heading: string;
  subHeading: string;
  fancyUrl: string;
  verticalPhotos: {
    [key: string]: {
      photoTypes: {
        [key: string]: {
          url: string;
        };
      };
    };
  };
};
