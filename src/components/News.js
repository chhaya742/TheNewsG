import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
// import newsItem from 
export default class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 15,
    category: 'general'
  }
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    console.log("hello this is a constructor");
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a9fc17d152794e12a13dd88c87770fe2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json().then();
    this.setState({ loading: false })
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults })
    console.log("hello this is a componentDidMount function");
  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1, })
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({page: this.state.page + 1,})
    this.updateNews();
  }
  render() {
    return (
      <div className="container ">
        <h1 className='text-center' style={{ margin: "35px" }}>TheNewsG - Top HeadLines</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url ? element.url : ""} publishedAt={element.publishedAt} author={element.author} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>

    )
  }
}
