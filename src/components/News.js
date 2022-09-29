import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// import newsItem from 
export default class News extends Component {
  toTitleCase = str => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
  static defaultProps = {
    country: 'in',
    // pageSize: 15,
    category: 'general'
  }
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 0
    }

    document.title = `${this.toTitleCase(this.props.category)} -TheNewsG`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json().then();
    // this.props.setProgress(10);
    this.props.setProgress(70);
    this.setState({ loading: false })
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults });
    this.props.setProgress(150);

  }
  async componentDidMount() {
    this.updateNews();
  }
  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews();
  // }
  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews();
  // }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json().then();
    this.setState({ loading: false })
    this.setState({ articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults })
  };
  
  render() {
    return (
      <>
        <h2 className='text-center' style={{ margin: "35px" }}>TheNewsG - Top {this.toTitleCase(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading ? <Spinner /> : ''}
        >
          <div className="container ">
            <div className='row'>
              {this.state.articles.map((element, index) => {
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
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div> */}
      </>

    )
  }
}
