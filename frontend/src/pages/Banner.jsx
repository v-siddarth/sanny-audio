import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { styled } from '@mui/material';
import { bannerData } from '../utils/products';

const Banner = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Desktop breakpoint
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768, // Tablet breakpoint
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480, // Mobile breakpoint
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {bannerData.map((image) => (
                <Image src={image.url} alt={image.alt} key={image._id} />
            ))}
        </Slider>
    );
};

export default Banner;

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 500,
    objectFit: 'cover', 
    [theme.breakpoints.down('sm')]: {
        height: 180,
    },
}));
