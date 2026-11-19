import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [nfts, setNfts] = useState([]);
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
    async function fetchNfts() {
      const data = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
      setNfts(data.data);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchNfts();
  }, []);

  // function calcTimeLeft({ expiryDate }) {
  //   const currentTime = new Date();
  //   const expiredTime = new Date(expiryDate);
  //   const difference = expiredTime - currentTime;

  //   let timeLeft = {};
  //   if (difference > 0) {
  //     timeLeft = {
  //       hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //       minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
  //       seconds: Math.floor((difference % (1000 * 60)) / 1000),
  //     };
  //   }
  //   return timeLeft;
  // };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
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
                nfts?.map((nft) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to="/author"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">{nft.expiryDate}</div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to="/item-details">
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to="/item-details">
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
