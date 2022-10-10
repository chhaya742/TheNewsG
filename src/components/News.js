import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import newsItem from 
export default function News(props){
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0);

  const toTitleCase = str => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())


  
  const updateNews=async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json().then();
    // props.setProgress(10);
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(150);

  }
  useEffect(()=>{
        document.title = `${toTitleCase(props.category)} -TheNewsG`;
    updateNews()

  },[])// eslint-disable-line react-hooks/exhaustive-deps
 
  // const handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }
  // const handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }
  const  fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    setLoading(true)
    let data = await fetch(url);
    let parseData = await data.json().then();
    setLoading(false)
   setArticles(articles.concat(parseData.articles))
   setTotalResults( parseData.totalResults)
  
  };
  

    return (
      <>
        <h1 className='text-center' style={{ margin: "30px",marginTop:"80px" }}>TheNewsG - Top {toTitleCase(props.category)} Headlines</h1>
        {/* {loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading ? <Spinner /> : ''}
        >
          <div className="container ">
            <div className='row'>
              {articles.map((element, index) => {
                return <div className='col-md-4' key={element.url+index}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} publishedAt={element.publishedAt} author={element.author} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div> */}
      </>

    )
      }

News.defaultProps = {
  country: 'in',
  // pageSize: 15,
  category: 'general'
}
News.PropsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}