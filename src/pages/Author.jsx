import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("author") || "73855012";
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [following, setFollowing] = useState(false);

  function handleFollow() {
    setFollowing((prev) => !prev);
  };

  useEffect(() => {
    let active = true;

    async function authorData() {
      setLoading(true);
      setError("");
      setAuthor(null);

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors",
          { params: { author: authorId }, timeout: 15000 },
        );

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!data || !data.authorName || !Array.isArray(data.nftCollection)) {
          throw new Error("Invalid author response");
        }

        if (active) setAuthor(data);
      } catch (error) {
        if (active)
          setError("Unable to load this author. Please try again later.");
      } finally {
        if (active) setLoading(false);
      }
    }

    authorData();

    return () => {
      active = false;
    };
  }, [authorId]);

  if (error) return <p role="alert">{error}</p>;
  if (!author && !loading) return <p>Author not found.</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {loading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <div className="img--skeleton"></div>
                        <div className="profile_name">
                          <div>
                            <div className="profile_name--skeleton"></div>
                            <div className="profile_username--skeleton"></div>
                            <div className="profile_wallet--skeleton"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower--skeleton"></div>
                        <div className="btn-main--skeleton"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt={author.authorName} />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {author.followers + (following ? 1 : 0)} followers
                        </div>
                        <Link to="#" className="btn-main" onClick={handleFollow}>
                          {following ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                    <AuthorItems
                      nfts={author?.nftCollection || []}
                      authorImage={author?.authorImage}
                      authorName={author?.authorName}
                      authorId={author?.authorId}
                      loading={loading}
                    />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
