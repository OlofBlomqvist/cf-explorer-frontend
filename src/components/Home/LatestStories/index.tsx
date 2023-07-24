import { Box, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

import ViewAllButtonExternal from "src/components/commons/ViewAllButtonExternal";
import { CalenderPaleIcon, SliderRight } from "src/commons/resources";
import { API } from "src/commons/utils/api";
import useFetch from "src/commons/hooks/useFetch";
import { formatDateTime, getHostname } from "src/commons/utils/helper";
import { CARDANO_NEWS_URL } from "src/commons/utils/constants";
import { useScreen } from "src/commons/hooks/useScreen";

import {
  Author,
  Description,
  Detail,
  FooterCard,
  Header,
  Image,
  Item,
  ItemTitle,
  LatestStoriesContainer,
  NextSwipper,
  ResourceHref,
  Time,
  TimeIcon,
  Title,
  WrapHeader,
  CustomGrid
} from "./style";

const defaultNumberOfItems = 40;

enum AMOUNT_OF_NEWS_SHOWING {
  DESKTOP = 4,
  TABLET = 4,
  MOBILE = 2
}

const LatestStories = () => {
  const [numberOfItems, setNumberOfItems] = useState<number>(defaultNumberOfItems);
  const { data, loading } = useFetch<Story[]>(`${API.STORIES}?amount=${numberOfItems}`);
  const [currentIndexData, setCurrentIndexData] = useState<number>(0);

  const [amountNewsByDevice, setAmountNewsByDevice] = useState<number>(0);

  const [isShown, setIsShown] = useState(false);
  const { isLaptop, isMobile } = useScreen();

  useEffect(() => {
    if (isMobile) {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.MOBILE);
      setIsShown(true);
    } else if (isLaptop) {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.TABLET);
      setIsShown(true);
    } else {
      setAmountNewsByDevice(AMOUNT_OF_NEWS_SHOWING.DESKTOP);
    }
  }, [isLaptop, isMobile]);

  const handleNextSwipper = async () => {
    let newIndex = currentIndexData + amountNewsByDevice;
    if (isMobile) {
      newIndex = currentIndexData + 1;
    }
    const isHasMore = newIndex < (data?.length || 0) - 1;
    if (isHasMore) {
      setCurrentIndexData(newIndex);
    } else {
      await setNumberOfItems(numberOfItems + defaultNumberOfItems);
      setCurrentIndexData(newIndex);
    }
  };

  if (loading) {
    return (
      <Box>
        <Header>
          <Title>Latest Stories</Title>
          <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} />
        </Header>
        <Grid container spacing={2}>
          {new Array(4).fill(0).map((_, index) => (
            <Grid key={index} lg={3} sm={6} xs={12} item>
              <Box component={Skeleton} variant="rectangular" borderRadius={"12px"} height={280} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const onMouseLeave = () => {
    if (!isLaptop) {
      setIsShown(false);
    }
  };

  return (
    <LatestStoriesContainer data-testid="home-latest-stories">
      <Header>
        <Title>Latest Stories</Title>
        <ViewAllButtonExternal to={CARDANO_NEWS_URL as string} />
      </Header>
      <Box position={"relative"} onMouseEnter={() => setIsShown(true)} onMouseLeave={onMouseLeave}>
        <Grid container spacing={2}>
          {(data?.slice(currentIndexData, currentIndexData + amountNewsByDevice) || []).map(
            ({ resource_href, main_image, main_image_alt, title, published_on, entity, blurb }, index) => {
              const isRelativeCardMobile = isMobile && index === 1;
              return (
                <CustomGrid key={published_on} lg={3} sm={6} xs={6} item>
                  <Box
                    onClick={() => window.open(resource_href, "_blank")}
                    sx={{ position: isRelativeCardMobile ? "absolute" : "unset", left: "300px" }}
                  >
                    <Item>
                      <Image src={main_image} alt={main_image_alt} />
                      <Detail>
                        <WrapHeader>
                          <Author>{entity}</Author>
                          <ResourceHref>{getHostname(resource_href)}</ResourceHref>
                        </WrapHeader>
                        <ItemTitle>{title} </ItemTitle>
                        <Description>{blurb}</Description>
                        <FooterCard>
                          <Time>
                            <TimeIcon src={CalenderPaleIcon} alt="calender pale" />
                            {formatDateTime(published_on)}
                          </Time>
                        </FooterCard>
                      </Detail>
                    </Item>
                  </Box>
                </CustomGrid>
              );
            }
          )}
        </Grid>
        {isShown && (
          <NextSwipper onClick={handleNextSwipper}>
            <SliderRight />
          </NextSwipper>
        )}
      </Box>
    </LatestStoriesContainer>
  );
};

export default LatestStories;
