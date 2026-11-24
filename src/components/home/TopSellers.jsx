import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function sellersData() {
      const data = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
      setSellers(data.data);

      await new Promise((resolve) => setTimeout(resolve, 1800));
      setLoading(false);
    };
    sellersData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {loading ? (
              <ol className="author_list">
                {Array.from({ length: 12 }).map((_, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <div className="pp-author img--skeleton"></div>
                    </div>
                    <div className="author_list_info">
                      <div className="author_name--skeleton"></div>
                      <div className="author_price--skeleton"></div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ol className="author_list">
                {sellers?.map((nft) => (
                  <li key={nft.id}>
                    <div className="author_list_pp">
                      <Link to={`/author?author=${nft.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={nft.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{nft.authorName}</Link>
                      <span>{nft.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
