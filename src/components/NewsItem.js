import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author, source } = this.props
    return (
      <div className='my-3'>
        <div className="card" >
          <span className={'badge position-absolute top-0 start-100 translate-middle badge-pill badge-danger'}>{source}</span>
          <img src={imageUrl ? imageUrl : "https://i.ytimg.com/vi/5LgxOXGH3y4/hqdefault.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">Last updated {new Date(publishedAt).toGMTString()} by {!author ? "unknon" : author}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>

    )
  }
}
