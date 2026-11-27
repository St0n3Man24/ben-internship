import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../home/Countdown";
import AOS from 'aos';
import "aos/dist/aos.css";

const ExploreItems = () => {
    const [nfts, setNfts] = useState([]);
    const [now, setNow] = useState(Date.now);
    const [visibleNfts, setVisibleNfts] = useState(8);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    async function nftData() {
      setLoading(true);
      const data = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filter ? `?filter=${filter}` : ""}`);
      setNfts(data.data);

      await new Promise(resolve => setTimeout((resolve), 2000));
      setLoading(false);
    };
    nftData();
  }, [filter]);

  useEffect(() => {
      const timer = setInterval(() => setNow(Date.now()), 1000)
      return () => clearInterval(timer)
    }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => setFilter(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        new Array(8).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp img--skeleton"></div>
            <div className="nft__item_wrap">
              <div className="nft__item_preview--skeleton"></div>
            </div>
            <div className="nft__item_info">
              <h4 className="nft__item_info--skeleton"></h4>
              <div className="nft__item_price--skeleton"></div>
            </div>
          </div>
        </div>
      ))
      ) : (
        nfts?.slice(0, visibleNfts).map((nft) => (
          <div
            key={nft.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author?author=${nft.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={nft.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {nft.expiryDate && <Countdown expiryDate={nft.expiryDate} now={now} />}

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
                  <img src={nft.nftImage} className="lazy nft__item_preview" alt="" />
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
      <div className="col-md-12 text-center" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1000">
        {visibleNfts < nfts.length && (
          <Link to="" id="loadmore" className="btn-main lead" onClick={() => setVisibleNfts((prev) => prev + 4)}>
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
