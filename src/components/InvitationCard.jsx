import React from 'react'
import {Helmet} from 'react-helmet'

import {majors} from '../configs'
import closeIcon from '../imgs/close.svg'

export default class InvitationCard extends React.Component {

  componentDidMount() {
    const { major, name, interviewRef } = this.props.selectedInterviewee
    if(major === '' && name === '' && interviewRef === '') {
      this.props.findByInterviewRef(this.props.match.params.interviewRef)
    }
  }

  handleClick = e => this.props.history.push('/')

  render() {
    const { interviewRef, major, name } = this.props.selectedInterviewee
    const css = majors[major]
      ? {
        color: majors[major].color,
        textColor: majors[major].textColor
      }
      : ''
    const title = `${interviewRef} ${name} WEB ${major.toUpperCase()}@YWC#15`
    return (
      <div className={`fixed dt h-100 w-100 tc bg-${css.color} ${css.textColor}`}>
        <Helmet>
          <meta property="og:url" content="https://oroy-ywc15-semi-final.herokuapp.com/"/>
          <meta property="og:type" content="article"/>
          <meta property="og:title" content={title}/>
          <meta
            property="og:description"
            content="Announcement of Applicants Qualified For The Interview"/>
          <meta
            property="og:image"
            content="https://oroy-ywc15-semi-final.herokuapp.com/preview-page.png"/>
          <title>{title}</title>
        </Helmet>
        <button
          onClick={this.handleClick}
          className="button-reset bn absolute pointer mh2 mt2 h2 w2 br-100 dim bg-white">
          <img src={closeIcon} alt="close-btn"/>
        </button>
        <div className="dtc v-mid">
          <div className={`mh1 mh6-ns pv3 pv6-ns ba b--${css.textColor} br1`}>
            <header >
              <h2 className="f6 ttu tracked mb2 lh-title fw9">{interviewRef}</h2>
            </header>
            <h1 className="f3 f1-ns f-headline-l fw1 i">{name}</h1>
            <hr className={`bb br3 w-60 w-80-ns b--${css.textColor}`}/>
            <blockquote className="ph0 mt4 mh0 measure f4 lh-copy center">
              <cite className="f6 ttu tracked fs-normal fw9 ">WEB {major
                  ? major.toUpperCase()
                  : ''}
                @ Young Webmaster Camp #15</cite>
            </blockquote>
            <div
              className="fb-share-button"
              data-href={`https://oroy-ywc15-semi-final.herokuapp.com${this.props.match.url}`}
              data-layout="button_count"
              data-size="large"
              data-mobile-iframe="true">
              <a
                className="fb-xfbml-parse-ignore"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foroy-ywc15-semi-final.herokuapp.com%2Finvitation-card%2F${interviewRef}&amp;src=sdkpreparse`}>
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}