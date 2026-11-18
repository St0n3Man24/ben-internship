import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {
  const [nftInfo, setNftInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slideToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ]
  };

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
      setNftInfo(data.data);

      await new Promise((resolve) => setTimeout(resolve, 1800));
      setLoading(false);
    };
    fetchData();
  }, []);


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...sliderSetting}>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div className="px-2" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap img--skeleton"></div>
                      <div className="nft_coll_pp img--skeleton"></div>
                      <div className="nft_coll_info">
                        <div className="nft_coll h4--skeleton"></div>
                        <div className="nft_coll span--skeleton"></div>
                      </div>
                    </div>
                  </div>
                ))) : (
              nftInfo?.map((nft) => (
                <div className="px-2" key={nft.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img src={nft.nftImage} className="lazy img-fluid" alt="" />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img className="lazy pp-coll" src={nft.authorImage} alt="" />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{nft.title}</h4>
                      </Link>
                      <span>ERC-{nft.code}</span>
                    </div>
                  </div>
                </div>
              )))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
