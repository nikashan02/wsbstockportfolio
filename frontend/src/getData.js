import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './posts.js';

const columns = [{
  dataField: 'stock',
  text: 'Stock',
  sort: true,
  //filter: textFilter()
}, {
  dataField: 'shares',
  text: 'Shares',
  sort: true
}, {
  dataField: 'sentiment',
  text: 'Sentiment',
  sort: true
}, {
  dataField: 'avg_cost',
  text: 'Average Cost',
  sort: true
}, {
  dataField: 'curr_price',
  text: 'Current Price',
  sort: true
}, {
  dataField: 'total_return',
  text: 'Total Return',
  sort: true,
  style: (cell, row, rowIndex, colIndex) => {
    if (cell.charAt(0) === '+') {
      return {
        color: '#4CAF50',
        fontWeight: 'bold'
      };
    } else if (cell.charAt(0) === '0') {
      return {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold'
      }
    }
    return {
      color: '#EF5350',
      fontWeight: 'bold'
    };
  }
},];

const defaultSorted = [{
  dataField: 'shares',
  order: 'desc'
}];

export default class GetData extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [
                {
                    "stock": "GME",
                    "shares": 4678,
                    "sentiment": 72,
                    "avg_cost": "$19.42",
                    "total_return": "- 2.99%",
                    "curr_price": "$18.84",
                    "posts": [
                        {
                            "title": "GameStop DD and potential profits.",
                            "upvotes": 1809,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km26gn/gamestop_dd_and_potential_profits/",
                            "created": "2020-12-29",
                            "historical": 19.38
                        },
                        {
                            "title": "GME ICR Conference - Words Matter",
                            "upvotes": 806,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kknuk6/gme_icr_conference_words_matter/",
                            "created": "2020-12-27",
                            "historical": 20.15
                        },
                        {
                            "title": "Ryan Cohen Tweet Analysis $GME",
                            "upvotes": 397,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knum06/ryan_cohen_tweet_analysis_gme/",
                            "created": "2021-01-01",
                            "historical": 18.84
                        },
                        {
                            "title": "Why GME is going to the Moon (Compressed information + Links)",
                            "upvotes": 402,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kl0n8g/why_gme_is_going_to_the_moon_compressed/",
                            "created": "2020-12-27",
                            "historical": 20.15
                        },
                        {
                            "title": "GME Gang GameStop.com 4Q20 Model Update",
                            "upvotes": 308,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kood9p/gme_gang_gamestopcom_4q20_model_update/",
                            "created": "2021-01-02",
                            "historical": 18.84
                        },
                        {
                            "title": "GME Gang, don't let Robinhood lend your shares to the shorts and Melvin! DD inside for more tendies",
                            "upvotes": 218,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmp6wo/gme_gang_dont_let_robinhood_lend_your_shares_to/",
                            "created": "2020-12-30",
                            "historical": 19.26
                        },
                        {
                            "title": "GME battle of the autistics vs hedge fund shorts. Threshold securities edition.",
                            "upvotes": 196,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmsw4c/gme_battle_of_the_autistics_vs_hedge_fund_shorts/",
                            "created": "2020-12-30",
                            "historical": 19.26
                        },
                        {
                            "title": "Have faith in RC, GME retards!",
                            "upvotes": 192,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knnrk4/have_faith_in_rc_gme_retards/",
                            "created": "2020-12-31",
                            "historical": 18.84
                        },
                        {
                            "title": "🚀GME DD PT2 🚀🚀🚀🚀 + Coordinated Charity for Autism and Kids + making it rain at GME + Coordinated Social Media",
                            "upvotes": 167,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knxf4f/gme_dd_pt2_coordinated_charity_for_autism_and/",
                            "created": "2021-01-01",
                            "historical": 18.84
                        },
                        {
                            "title": "🚀🚀🚀JUICY GME DD 🚀🚀🚀 + Reason behind ICR change",
                            "upvotes": 150,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/ko2i9h/juicy_gme_dd_reason_behind_icr_change/",
                            "created": "2021-01-01",
                            "historical": 18.84
                        },
                        {
                            "title": "EVs wil fly again",
                            "upvotes": 33,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knk6j2/evs_wil_fly_again/",
                            "created": "2020-12-31",
                            "historical": 18.84
                        }
                    ]
                },
                {
                    "stock": "PLTR",
                    "shares": 1739,
                    "sentiment": 24,
                    "avg_cost": "$24.27",
                    "total_return": "- 2.97%",
                    "curr_price": "$23.55",
                    "posts": [
                        {
                            "title": "Someone bought 3 million PLTR shares today before closing .",
                            "upvotes": 862,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knbiim/someone_bought_3_million_pltr_shares_today_before/",
                            "created": "2020-12-31",
                            "historical": 23.55
                        },
                        {
                            "title": "PLTR now is the time to get in 🚀🚀🚀🚀",
                            "upvotes": 336,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klyl2q/pltr_now_is_the_time_to_get_in/",
                            "created": "2020-12-29",
                            "historical": 24.66
                        },
                        {
                            "title": "Why Palantir is going to the moon🚀: A guide for paperhanded dummies",
                            "upvotes": 223,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kospbm/why_palantir_is_going_to_the_moon_a_guide_for/",
                            "created": "2021-01-02",
                            "historical": 23.55
                        },
                        {
                            "title": "Palantir finds support! Light your rockets bois!! 🚀🚀🚀🚀🚀",
                            "upvotes": 122,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmpm2u/palantir_finds_support_light_your_rockets_bois/",
                            "created": "2020-12-30",
                            "historical": 25.1
                        },
                        {
                            "title": "PLTR lockdown expiration bullish thesis",
                            "upvotes": 85,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kke66c/pltr_lockdown_expiration_bullish_thesis/",
                            "created": "2020-12-26",
                            "historical": 27.75
                        },
                        {
                            "title": "The Importance of Ambiguity in the Meme Market",
                            "upvotes": 70,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kkzu8q/the_importance_of_ambiguity_in_the_meme_market/",
                            "created": "2020-12-27",
                            "historical": 27.75
                        },
                        {
                            "title": "Hexagon Purus (Hydrogen Fuel Tank Supplier)",
                            "upvotes": 20,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kn2rqj/hexagon_purus_hydrogen_fuel_tank_supplier/",
                            "created": "2020-12-30",
                            "historical": 25.1
                        },
                        {
                            "title": "PLTR Quicky",
                            "upvotes": 21,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knw90u/pltr_quicky/",
                            "created": "2021-01-01",
                            "historical": 23.55
                        }
                    ]
                },
                {
                    "stock": "AAPL",
                    "shares": 626,
                    "sentiment": 89,
                    "avg_cost": "$132.69",
                    "total_return": "0.00%",
                    "curr_price": "$132.69",
                    "posts": [
                        {
                            "title": "I think WSB is sleeping on a huge opportunity in Apple this month. Here’s why.",
                            "upvotes": 548,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/koonr3/i_think_wsb_is_sleeping_on_a_huge_opportunity_in/",
                            "created": "2021-01-02",
                            "historical": 132.69
                        },
                        {
                            "title": "AAPL is the 2021 Play",
                            "upvotes": 78,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kntu36/aapl_is_the_2021_play/",
                            "created": "2021-01-01",
                            "historical": 132.69
                        }
                    ]
                },
                {
                    "stock": "PSTH",
                    "shares": 591,
                    "sentiment": 38,
                    "avg_cost": "$26.12",
                    "total_return": "+ 6.13%",
                    "curr_price": "$27.72",
                    "posts": [
                        {
                            "title": "🚀 🚀 PSTH Explained - I've Had Enough - This is a Monetary Handout - Please Take It And Stop Private Messaging Me🚀 🚀",
                            "upvotes": 525,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kldiv2/psth_explained_ive_had_enough_this_is_a_monetary/",
                            "created": "2020-12-28",
                            "historical": 25.99
                        },
                        {
                            "title": "Starlink/PSTH timeline",
                            "upvotes": 44,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kos9y9/starlinkpsth_timeline/",
                            "created": "2021-01-02",
                            "historical": 27.72
                        },
                        {
                            "title": "PSTH ROCKET SHIP and PAPA ACKMAN take me to TENDIE TOWN",
                            "upvotes": 22,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kkx062/psth_rocket_ship_and_papa_ackman_take_me_to/",
                            "created": "2020-12-27",
                            "historical": 26.03
                        }
                    ]
                },
                {
                    "stock": "KEYS",
                    "shares": 451,
                    "sentiment": 53,
                    "avg_cost": "$130.95",
                    "total_return": "+ 0.87%",
                    "curr_price": "$132.09",
                    "posts": [
                        {
                            "title": "Why you should have all your money in Genetics",
                            "upvotes": 451,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kkk00p/why_you_should_have_all_your_money_in_genetics/",
                            "created": "2020-12-26",
                            "historical": 130.95
                        }
                    ]
                },
                {
                    "stock": "VALE",
                    "shares": 392,
                    "sentiment": 31,
                    "avg_cost": "$16.84",
                    "total_return": "- 0.48%",
                    "curr_price": "$16.76",
                    "posts": [
                        {
                            "title": "Steel Update #4 - consolidation = consolidation $ 4 stocks that will benefit",
                            "upvotes": 392,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km2p56/steel_update_4_consolidation_consolidation_4/",
                            "created": "2020-12-29",
                            "historical": 16.84
                        }
                    ]
                },
                {
                    "stock": "BLNK",
                    "shares": 278,
                    "sentiment": -7,
                    "avg_cost": "$40.41",
                    "total_return": "+ 5.79%",
                    "curr_price": "$42.75",
                    "posts": [
                        {
                            "title": "BLNK Blink charging is the biggest EV bubble of them all",
                            "upvotes": 278,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km6kn3/blnk_blink_charging_is_the_biggest_ev_bubble_of/",
                            "created": "2020-12-29",
                            "historical": 40.405
                        }
                    ]
                },
                {
                    "stock": "GE",
                    "shares": 230,
                    "sentiment": 17,
                    "avg_cost": "$10.8",
                    "total_return": "0.00%",
                    "curr_price": "$10.8",
                    "posts": [
                        {
                            "title": "Its a Boomer play, but its guaranteed money: $GE Leaps",
                            "upvotes": 230,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kn6iy2/its_a_boomer_play_but_its_guaranteed_money_ge/",
                            "created": "2020-12-31",
                            "historical": 10.8
                        }
                    ]
                },
                {
                    "stock": "WORK",
                    "shares": 302,
                    "sentiment": 40,
                    "avg_cost": "$42.24",
                    "total_return": "0.00%",
                    "curr_price": "$42.24",
                    "posts": [
                        {
                            "title": "Why Palantir is a Solid Long (Software Engineer Perspective)",
                            "upvotes": 185,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km624j/why_palantir_is_a_solid_long_software_engineer/",
                            "created": "2020-12-29",
                            "historical": 42.24
                        },
                        {
                            "title": "Palantir Inc. mentioned in WSJ Article two hours ago",
                            "upvotes": 93,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kopn17/palantir_inc_mentioned_in_wsj_article_two_hours/",
                            "created": "2021-01-02",
                            "historical": 42.24
                        },
                        {
                            "title": "Novus Capital SPAC (read: AppHarvest)",
                            "upvotes": 24,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klwjh4/novus_capital_spac_read_appharvest/",
                            "created": "2020-12-29",
                            "historical": 42.24
                        }
                    ]
                },
                {
                    "stock": "TGT",
                    "shares": 218,
                    "sentiment": 3,
                    "avg_cost": "$174.74",
                    "total_return": "+ 1.02%",
                    "curr_price": "$176.53",
                    "posts": [
                        {
                            "title": "$BBBY - Short squeeze imminent",
                            "upvotes": 162,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klwaja/bbby_short_squeeze_imminent/",
                            "created": "2020-12-29",
                            "historical": 175.04
                        },
                        {
                            "title": "Bed Bath to the 🌕 and Beyond [Updated DD]",
                            "upvotes": 56,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmkn72/bed_bath_to_the_and_beyond_updated_dd/",
                            "created": "2020-12-30",
                            "historical": 173.88
                        }
                    ]
                },
                {
                    "stock": "NIO",
                    "shares": 246,
                    "sentiment": 6,
                    "avg_cost": "$45.89",
                    "total_return": "+ 6.21%",
                    "curr_price": "$48.74",
                    "posts": [
                        {
                            "title": "NIO will miss 4Q delivery guidance",
                            "upvotes": 150,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klsd7h/nio_will_miss_4q_delivery_guidance/",
                            "created": "2020-12-28",
                            "historical": 44.06
                        },
                        {
                            "title": "Canoo Stop or GOEV",
                            "upvotes": 60,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knql7l/canoo_stop_or_goev/",
                            "created": "2020-12-31",
                            "historical": 48.74
                        },
                        {
                            "title": "Something to feed your confirmation bias on Nio",
                            "upvotes": 36,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/koqieb/something_to_feed_your_confirmation_bias_on_nio/",
                            "created": "2021-01-02",
                            "historical": 48.74
                        }
                    ]
                },
                {
                    "stock": "DKNG",
                    "shares": 161,
                    "sentiment": 19,
                    "avg_cost": "$48.53",
                    "total_return": "- 4.06%",
                    "curr_price": "$46.56",
                    "posts": [
                        {
                            "title": "The Ultimate Parlay: DraftKings ($DKNG)",
                            "upvotes": 132,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klgeyo/the_ultimate_parlay_draftkings_dkng/",
                            "created": "2020-12-28",
                            "historical": 48.96
                        },
                        {
                            "title": "GNOG a pure online gambling stock",
                            "upvotes": 29,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knqh7u/gnog_a_pure_online_gambling_stock/",
                            "created": "2020-12-31",
                            "historical": 46.56
                        }
                    ]
                },
                {
                    "stock": "MINI",
                    "shares": 87,
                    "sentiment": 66,
                    "avg_cost": "$29.5",
                    "total_return": "0.00%",
                    "curr_price": "$29.5",
                    "posts": [
                        {
                            "title": "$U DD: There has never been anything like it",
                            "upvotes": 87,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kljpso/u_dd_there_has_never_been_anything_like_it/",
                            "created": "2020-12-28",
                            "historical": 29.5
                        }
                    ]
                },
                {
                    "stock": "BBBY",
                    "shares": 263,
                    "sentiment": 12,
                    "avg_cost": "$18.63",
                    "total_return": "- 4.67%",
                    "curr_price": "$17.76",
                    "posts": [
                        {
                            "title": "Bed Bath to infinity and Beyond - $BBBY - Solid DD Document",
                            "upvotes": 87,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmp2lg/bed_bath_to_infinity_and_beyond_bbby_solid_dd/",
                            "created": "2020-12-30",
                            "historical": 18.65
                        },
                        {
                            "title": "Very bullish on $BBBY, DD included",
                            "upvotes": 61,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km048x/very_bullish_on_bbby_dd_included/",
                            "created": "2020-12-29",
                            "historical": 18.83
                        },
                        {
                            "title": "BBBY earnings and technical play",
                            "upvotes": 49,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klzobw/bbby_earnings_and_technical_play/",
                            "created": "2020-12-29",
                            "historical": 18.83
                        },
                        {
                            "title": "BBBY Short Squeeze Thesis",
                            "upvotes": 37,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmhaod/bbby_short_squeeze_thesis/",
                            "created": "2020-12-30",
                            "historical": 18.65
                        },
                        {
                            "title": "$BBBY Short squeeze plan",
                            "upvotes": 29,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kojkmt/bbby_short_squeeze_plan/",
                            "created": "2021-01-02",
                            "historical": 17.76
                        }
                    ]
                },
                {
                    "stock": "UBER",
                    "shares": 91,
                    "sentiment": 50,
                    "avg_cost": "$51",
                    "total_return": "0.00%",
                    "curr_price": "$51",
                    "posts": [
                        {
                            "title": "Why I'm emptying my bank account and buying long $GOOGL calls",
                            "upvotes": 91,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kndkc7/why_im_emptying_my_bank_account_and_buying_long/",
                            "created": "2020-12-31",
                            "historical": 51
                        }
                    ]
                },
                {
                    "stock": "TSLA",
                    "shares": 98,
                    "sentiment": 3,
                    "avg_cost": "$705.67",
                    "total_return": "0.00%",
                    "curr_price": "$705.67",
                    "posts": [
                        {
                            "title": "The TSLA 2021 Trade Plan",
                            "upvotes": 79,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kobcex/the_tsla_2021_trade_plan/",
                            "created": "2021-01-01",
                            "historical": 705.67
                        },
                        {
                            "title": "EV battery play: manganese miners",
                            "upvotes": 19,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knwaki/ev_battery_play_manganese_miners/",
                            "created": "2021-01-01",
                            "historical": 705.67
                        }
                    ]
                },
                {
                    "stock": "NFLX",
                    "shares": 62,
                    "sentiment": 19,
                    "avg_cost": "$540.73",
                    "total_return": "0.00%",
                    "curr_price": "$540.73",
                    "posts": [
                        {
                            "title": "The Dummy's guide to trading the Georgia Senate Runoff",
                            "upvotes": 62,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kouetj/the_dummys_guide_to_trading_the_georgia_senate/",
                            "created": "2021-01-02",
                            "historical": 540.73
                        }
                    ]
                },
                {
                    "stock": "CRSR",
                    "shares": 141,
                    "sentiment": 27,
                    "avg_cost": "$36.54",
                    "total_return": "- 0.88%",
                    "curr_price": "$36.22",
                    "posts": [
                        {
                            "title": "CRSR DD - Discounted stock! 🚀🚀🚀",
                            "upvotes": 73,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kp0dzb/crsr_dd_discounted_stock/",
                            "created": "2021-01-03",
                            "historical": 36.22
                        },
                        {
                            "title": "$CRSR: Y'all are missing the point (Elgato = Tendies)",
                            "upvotes": 68,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmoxoo/crsr_yall_are_missing_the_point_elgato_tendies/",
                            "created": "2020-12-30",
                            "historical": 36.89
                        }
                    ]
                },
                {
                    "stock": "IP",
                    "shares": 75,
                    "sentiment": 5,
                    "avg_cost": "$49.64",
                    "total_return": "+ 0.16%",
                    "curr_price": "$49.72",
                    "posts": [
                        {
                            "title": "DD PSA: How to avoid getting fooled by a company like Nikola again",
                            "upvotes": 75,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmmt51/dd_psa_how_to_avoid_getting_fooled_by_a_company/",
                            "created": "2020-12-30",
                            "historical": 49.64
                        }
                    ]
                },
                {
                    "stock": "APHA",
                    "shares": 83,
                    "sentiment": 49,
                    "avg_cost": "$6.92",
                    "total_return": "0.00%",
                    "curr_price": "$6.92",
                    "posts": [
                        {
                            "title": "Aphria Inc (APHA): yes it's cannabis, yes it's about to get you high on gains in 2021 😮‍💨🥦🚀🚀🚀",
                            "upvotes": 65,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kn4wck/aphria_inc_apha_yes_its_cannabis_yes_its_about_to/",
                            "created": "2020-12-31",
                            "historical": 6.92
                        },
                        {
                            "title": "Smoke $TLRY Everyday",
                            "upvotes": 18,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knfv2w/smoke_tlry_everyday/",
                            "created": "2020-12-31",
                            "historical": 6.92
                        }
                    ]
                },
                {
                    "stock": "LULU",
                    "shares": 60,
                    "sentiment": -8,
                    "avg_cost": "$353.22",
                    "total_return": "- 1.47%",
                    "curr_price": "$348.03",
                    "posts": [
                        {
                            "title": "$LULU to the moon and here is why",
                            "upvotes": 60,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klxhx6/lulu_to_the_moon_and_here_is_why/",
                            "created": "2020-12-29",
                            "historical": 353.22
                        }
                    ]
                },
                {
                    "stock": "SGMO",
                    "shares": 63,
                    "sentiment": 20,
                    "avg_cost": "$18.04",
                    "total_return": "- 13.5%",
                    "curr_price": "$15.605",
                    "posts": [
                        {
                            "title": "SGMO DD- Crispr Patents, valuation, and ARKG",
                            "upvotes": 63,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klfpgo/sgmo_dd_crispr_patents_valuation_and_arkg/",
                            "created": "2020-12-28",
                            "historical": 18.04
                        }
                    ]
                },
                {
                    "stock": "AMC",
                    "shares": 80,
                    "sentiment": -14,
                    "avg_cost": "$2.15",
                    "total_return": "- 1.4%",
                    "curr_price": "$2.12",
                    "posts": [
                        {
                            "title": "Disney and AMC Will Happen - Ban Redemption DD",
                            "upvotes": 60,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmk1f7/disney_and_amc_will_happen_ban_redemption_dd/",
                            "created": "2020-12-30",
                            "historical": 2.16
                        },
                        {
                            "title": "AMC is close to bankruptcy - An excellent time to go long.",
                            "upvotes": 20,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/koexxz/amc_is_close_to_bankruptcy_an_excellent_time_to/",
                            "created": "2021-01-02",
                            "historical": 2.12
                        }
                    ]
                },
                {
                    "stock": "CC",
                    "shares": 53,
                    "sentiment": 50,
                    "avg_cost": "$24.79",
                    "total_return": "0.00%",
                    "curr_price": "$24.79",
                    "posts": [
                        {
                            "title": "A Bet on Canadian Cannabis Part 3",
                            "upvotes": 53,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kltsat/a_bet_on_canadian_cannabis_part_3/",
                            "created": "2020-12-29",
                            "historical": 24.79
                        }
                    ]
                },
                {
                    "stock": "BABA",
                    "shares": 51,
                    "sentiment": -2,
                    "avg_cost": "$236.26",
                    "total_return": "- 1.49%",
                    "curr_price": "$232.73",
                    "posts": [
                        {
                            "title": "Alibaba, Dengism, and the Chinese push for foreign investment",
                            "upvotes": 51,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km6qhm/alibaba_dengism_and_the_chinese_push_for_foreign/",
                            "created": "2020-12-29",
                            "historical": 236.26
                        }
                    ]
                },
                {
                    "stock": "CRSP",
                    "shares": 50,
                    "sentiment": 45,
                    "avg_cost": "$161.57",
                    "total_return": "- 5.24%",
                    "curr_price": "$153.11",
                    "posts": [
                        {
                            "title": "ARKG: blasphemy",
                            "upvotes": 50,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmt48b/arkg_blasphemy/",
                            "created": "2020-12-30",
                            "historical": 161.57
                        }
                    ]
                },
                {
                    "stock": "FEYE",
                    "shares": 51,
                    "sentiment": 9,
                    "avg_cost": "$22.94",
                    "total_return": "+ 0.52%",
                    "curr_price": "$23.06",
                    "posts": [
                        {
                            "title": "Cybersecurity overview / DD (FEYE, FTNT, and more)",
                            "upvotes": 51,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klegl7/cybersecurity_overview_dd_feye_ftnt_and_more/",
                            "created": "2020-12-28",
                            "historical": 22.94
                        }
                    ]
                },
                {
                    "stock": "E",
                    "shares": 41,
                    "sentiment": -30,
                    "avg_cost": "$20.99",
                    "total_return": "- 1.86%",
                    "curr_price": "$20.6",
                    "posts": [
                        {
                            "title": "2021 will be a great year for Ford",
                            "upvotes": 41,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km3zj4/2021_will_be_a_great_year_for_ford/",
                            "created": "2020-12-29",
                            "historical": 20.99
                        }
                    ]
                },
                {
                    "stock": "IMMR",
                    "shares": 44,
                    "sentiment": -12,
                    "avg_cost": "$11.93",
                    "total_return": "- 5.36%",
                    "curr_price": "$11.29",
                    "posts": [
                        {
                            "title": "Most undervalued stock on the market - PS5 tech supplier about to link with $TSLA, literally zero discussion on WSB",
                            "upvotes": 44,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmhad7/most_undervalued_stock_on_the_market_ps5_tech/",
                            "created": "2020-12-30",
                            "historical": 11.93
                        }
                    ]
                },
                {
                    "stock": "ZUO",
                    "shares": 41,
                    "sentiment": 18,
                    "avg_cost": "$13.84",
                    "total_return": "+ 0.65%",
                    "curr_price": "$13.93",
                    "posts": [
                        {
                            "title": "$ZUO 🚀rocket ship🚀fueling up (29% done.. 71% to go)",
                            "upvotes": 41,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmfbf5/zuo_rocket_shipfueling_up_29_done_71_to_go/",
                            "created": "2020-12-29",
                            "historical": 13.84
                        }
                    ]
                },
                {
                    "stock": "SNAP",
                    "shares": 67,
                    "sentiment": -7,
                    "avg_cost": "$49.21",
                    "total_return": "+ 1.75%",
                    "curr_price": "$50.07",
                    "posts": [
                        {
                            "title": "Why SNAP a bullish scenario and will be around 100$ in 18 months",
                            "upvotes": 32,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klcri0/why_snap_a_bullish_scenario_and_will_be_around/",
                            "created": "2020-12-28",
                            "historical": 48.26
                        },
                        {
                            "title": "Just unbanned for GME DD. Next up TWTR DD for 2021.",
                            "upvotes": 24,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/koc97m/just_unbanned_for_gme_dd_next_up_twtr_dd_for_2021/",
                            "created": "2021-01-01",
                            "historical": 50.07
                        },
                        {
                            "title": "SNAP Earnings🚀",
                            "upvotes": 11,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knutsr/snap_earnings/",
                            "created": "2021-01-01",
                            "historical": 50.07
                        }
                    ]
                },
                {
                    "stock": "Y",
                    "shares": 37,
                    "sentiment": -39,
                    "avg_cost": "$598.28",
                    "total_return": "+ 0.9%",
                    "curr_price": "$603.69",
                    "posts": [
                        {
                            "title": "JOYY is a fraud",
                            "upvotes": 37,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kludav/joyy_is_a_fraud/",
                            "created": "2020-12-29",
                            "historical": 598.28
                        }
                    ]
                },
                {
                    "stock": "UI",
                    "shares": 35,
                    "sentiment": 31,
                    "avg_cost": "$275.01",
                    "total_return": "+ 1.27%",
                    "curr_price": "$278.51",
                    "posts": [
                        {
                            "title": "Blue Prism DD. 100%+ upside potential in the near term based on the upcoming UI Path IPO",
                            "upvotes": 35,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmeicy/blue_prism_dd_100_upside_potential_in_the_near/",
                            "created": "2020-12-29",
                            "historical": 275.01
                        }
                    ]
                },
                {
                    "stock": "MP",
                    "shares": 71,
                    "sentiment": 4,
                    "avg_cost": "$32.37",
                    "total_return": "- 0.62%",
                    "curr_price": "$32.17",
                    "posts": [
                        {
                            "title": "DD on MP Materials ($MP) 🚀",
                            "upvotes": 31,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kn85ah/dd_on_mp_materials_mp/",
                            "created": "2020-12-31",
                            "historical": 32.17
                        },
                        {
                            "title": "$MP - MP Materials DD",
                            "upvotes": 24,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmmg97/mp_mp_materials_dd/",
                            "created": "2020-12-30",
                            "historical": 32.77
                        },
                        {
                            "title": "$MP == Must Play --&gt; MP Materials DD",
                            "upvotes": 16,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kn8u19/mp_must_play_mp_materials_dd/",
                            "created": "2020-12-31",
                            "historical": 32.17
                        }
                    ]
                },
                {
                    "stock": "GT",
                    "shares": 38,
                    "sentiment": 12,
                    "avg_cost": "$10.91",
                    "total_return": "0.00%",
                    "curr_price": "$10.91",
                    "posts": [
                        {
                            "title": "GT (Goodyear Tires): While everyone is posting trades that have already rocketed, this one is only starting.",
                            "upvotes": 38,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knwbme/gt_goodyear_tires_while_everyone_is_posting/",
                            "created": "2021-01-01",
                            "historical": 10.91
                        }
                    ]
                },
                {
                    "stock": "RMG",
                    "shares": 31,
                    "sentiment": 7,
                    "avg_cost": "$27",
                    "total_return": "- 16.7%",
                    "curr_price": "$22.49",
                    "posts": [
                        {
                            "title": "Romeo Power is set to go public through a S P A C $RMG. I've hit $XL and $QS pre-merger and this has a similar feel. Details inside.",
                            "upvotes": 31,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km2ifk/romeo_power_is_set_to_go_public_through_a_s_p_a_c/",
                            "created": "2020-12-29",
                            "historical": 27
                        }
                    ]
                },
                {
                    "stock": "VSPR",
                    "shares": 25,
                    "sentiment": 19,
                    "avg_cost": "$11.75",
                    "total_return": "- 3.74%",
                    "curr_price": "$11.31",
                    "posts": [
                        {
                            "title": "VSPR - New $BECKY SPAC",
                            "upvotes": 25,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km6pgu/vspr_new_becky_spac/",
                            "created": "2020-12-29",
                            "historical": 11.75
                        }
                    ]
                },
                {
                    "stock": "NVAX",
                    "shares": 33,
                    "sentiment": 3,
                    "avg_cost": "$120.27",
                    "total_return": "- 7.28%",
                    "curr_price": "$111.51",
                    "posts": [
                        {
                            "title": "New info, NVAX preliminary results soon - 1/15c, 1/22c",
                            "upvotes": 33,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km8l6e/new_info_nvax_preliminary_results_soon_115c_122c/",
                            "created": "2020-12-29",
                            "historical": 120.27
                        }
                    ]
                },
                {
                    "stock": "FORD",
                    "shares": 29,
                    "sentiment": -11,
                    "avg_cost": "$1.87",
                    "total_return": "- 2.67%",
                    "curr_price": "$1.82",
                    "posts": [
                        {
                            "title": "Why Ford is Primed To double",
                            "upvotes": 29,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km21kn/why_ford_is_primed_to_double/",
                            "created": "2020-12-29",
                            "historical": 1.87
                        }
                    ]
                },
                {
                    "stock": "VIAC",
                    "shares": 25,
                    "sentiment": 26,
                    "avg_cost": "$36.72",
                    "total_return": "+ 1.47%",
                    "curr_price": "$37.26",
                    "posts": [
                        {
                            "title": "VIAC Bull Case",
                            "upvotes": 25,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmb3ry/viac_bull_case/",
                            "created": "2020-12-29",
                            "historical": 36.72
                        }
                    ]
                },
                {
                    "stock": "BBY",
                    "shares": 37,
                    "sentiment": 2,
                    "avg_cost": "$100.31",
                    "total_return": "- 0.52%",
                    "curr_price": "$99.79",
                    "posts": [
                        {
                            "title": "BBY and why you Best Buy it",
                            "upvotes": 25,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knukiv/bby_and_why_you_best_buy_it/",
                            "created": "2021-01-01",
                            "historical": 99.79
                        },
                        {
                            "title": "BBY - Your next 10 bagger",
                            "upvotes": 12,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmm4sr/bby_your_next_10_bagger/",
                            "created": "2020-12-30",
                            "historical": 101.38
                        }
                    ]
                },
                {
                    "stock": "T",
                    "shares": 22,
                    "sentiment": 15,
                    "avg_cost": "$28.76",
                    "total_return": "0.00%",
                    "curr_price": "$28.76",
                    "posts": [
                        {
                            "title": "$ARCT completely misunderstood",
                            "upvotes": 22,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knm7o4/arct_completely_misunderstood/",
                            "created": "2020-12-31",
                            "historical": 28.76
                        }
                    ]
                },
                {
                    "stock": "CRM",
                    "shares": 24,
                    "sentiment": -9,
                    "avg_cost": "$225.78",
                    "total_return": "- 1.44%",
                    "curr_price": "$222.53",
                    "posts": [
                        {
                            "title": "CRM Vaccine Play or a WSB 4D Chess Move - or take Boomer Joe’s King(s) in Dimension 7",
                            "upvotes": 24,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kkbtbi/crm_vaccine_play_or_a_wsb_4d_chess_move_or_take/",
                            "created": "2020-12-26",
                            "historical": 225.78
                        }
                    ]
                },
                {
                    "stock": "SE",
                    "shares": 19,
                    "sentiment": 12,
                    "avg_cost": "$180.28",
                    "total_return": "+ 10.41%",
                    "curr_price": "$199.05",
                    "posts": [
                        {
                            "title": "Digital Banking will be huge for $SE - comparing market opp for them",
                            "upvotes": 19,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/klcl9c/digital_banking_will_be_huge_for_se_comparing/",
                            "created": "2020-12-28",
                            "historical": 180.28
                        }
                    ]
                },
                {
                    "stock": "BHP",
                    "shares": 22,
                    "sentiment": -1,
                    "avg_cost": "$65.7",
                    "total_return": "- 0.55%",
                    "curr_price": "$65.34",
                    "posts": [
                        {
                            "title": "Non existent (for now) nuclear energy play",
                            "upvotes": 22,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km5gxx/non_existent_for_now_nuclear_energy_play/",
                            "created": "2020-12-29",
                            "historical": 65.7
                        }
                    ]
                },
                {
                    "stock": "JMIA",
                    "shares": 21,
                    "sentiment": -27,
                    "avg_cost": "$40.35",
                    "total_return": "0.00%",
                    "curr_price": "$40.35",
                    "posts": [
                        {
                            "title": "Calls on Nigerian Scam Jumia - $90K Buy In",
                            "upvotes": 21,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knquvb/calls_on_nigerian_scam_jumia_90k_buy_in/",
                            "created": "2020-12-31",
                            "historical": 40.35
                        }
                    ]
                },
                {
                    "stock": "EAT",
                    "shares": 17,
                    "sentiment": 7,
                    "avg_cost": "$57.71",
                    "total_return": "- 1.98%",
                    "curr_price": "$56.57",
                    "posts": [
                        {
                            "title": "The Future of Soy",
                            "upvotes": 17,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kk9nza/the_future_of_soy/",
                            "created": "2020-12-26",
                            "historical": 57.71
                        }
                    ]
                },
                {
                    "stock": "TTCF",
                    "shares": 19,
                    "sentiment": 21,
                    "avg_cost": "$22.89",
                    "total_return": "0.00%",
                    "curr_price": "$22.89",
                    "posts": [
                        {
                            "title": "Anyone investing TTCF? My thesis below of price prediction and catalysts for 2021, interested to hear bullish/bearish sides",
                            "upvotes": 19,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kp2a2o/anyone_investing_ttcf_my_thesis_below_of_price/",
                            "created": "2021-01-03",
                            "historical": 22.89
                        }
                    ]
                },
                {
                    "stock": "SHIP",
                    "shares": 21,
                    "sentiment": -13,
                    "avg_cost": "$0.54",
                    "total_return": "- 0.44%",
                    "curr_price": "$0.5376",
                    "posts": [
                        {
                            "title": "$SNOWing in Hell",
                            "upvotes": 21,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/knrtq1/snowing_in_hell/",
                            "created": "2020-12-31",
                            "historical": 0.5376
                        }
                    ]
                },
                {
                    "stock": "ADS",
                    "shares": 16,
                    "sentiment": -8,
                    "avg_cost": "$74.1",
                    "total_return": "0.00%",
                    "curr_price": "$74.1",
                    "posts": [
                        {
                            "title": "DD - Digital Marketing",
                            "upvotes": 16,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kon4gq/dd_digital_marketing/",
                            "created": "2021-01-02",
                            "historical": 74.1
                        }
                    ]
                },
                {
                    "stock": "LGVW",
                    "shares": 20,
                    "sentiment": 36,
                    "avg_cost": "$20.5",
                    "total_return": "- 3.46%",
                    "curr_price": "$19.79",
                    "posts": [
                        {
                            "title": "DD on LGVW (Soon to be BFLY) the love child of Bill Gates and Cathie Wood",
                            "upvotes": 20,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kmpbh1/dd_on_lgvw_soon_to_be_bfly_the_love_child_of_bill/",
                            "created": "2020-12-30",
                            "historical": 20.5
                        }
                    ]
                },
                {
                    "stock": "PLUS",
                    "shares": 20,
                    "sentiment": -1,
                    "avg_cost": "$86.36",
                    "total_return": "+ 1.84%",
                    "curr_price": "$87.95",
                    "posts": [
                        {
                            "title": "Bed Bath and Beyond: Bullish or Bearish?",
                            "upvotes": 20,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kkzz8j/bed_bath_and_beyond_bullish_or_bearish/",
                            "created": "2020-12-27",
                            "historical": 86.36
                        }
                    ]
                },
                {
                    "stock": "BIT",
                    "shares": 17,
                    "sentiment": -8,
                    "avg_cost": "$17.26",
                    "total_return": "+ 1.62%",
                    "curr_price": "$17.54",
                    "posts": [
                        {
                            "title": "There’s a Sale on BJ’s!",
                            "upvotes": 17,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km71js/theres_a_sale_on_bjs/",
                            "created": "2020-12-29",
                            "historical": 17.26
                        }
                    ]
                },
                {
                    "stock": "CVX",
                    "shares": 9,
                    "sentiment": 76,
                    "avg_cost": "$84.45",
                    "total_return": "0.00%",
                    "curr_price": "$84.45",
                    "posts": [
                        {
                            "title": "Just letting you know the bullshit behind clean energy: be long on big oil",
                            "upvotes": 9,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kov8u5/just_letting_you_know_the_bullshit_behind_clean/",
                            "created": "2021-01-02",
                            "historical": 84.45
                        }
                    ]
                },
                {
                    "stock": "XPEV",
                    "shares": 13,
                    "sentiment": -6,
                    "avg_cost": "$41.55",
                    "total_return": "+ 3.08%",
                    "curr_price": "$42.83",
                    "posts": [
                        {
                            "title": "XPEV DD 🚀",
                            "upvotes": 13,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/km9da4/xpev_dd/",
                            "created": "2020-12-29",
                            "historical": 41.55
                        }
                    ]
                },
                {
                    "stock": "QS",
                    "shares": 17,
                    "sentiment": -2,
                    "avg_cost": "$84.45",
                    "total_return": "0.00%",
                    "curr_price": "$84.45",
                    "posts": [
                        {
                            "title": "QuantumScape [Real DD]",
                            "upvotes": 17,
                            "url": "https://www.reddit.com/r/wallstreetbets/comments/kohyil/quantumscape_real_dd/",
                            "created": "2021-01-02",
                            "historical": 84.45
                        }
                    ]
                }
            ],
      width: 400
    };
  }

  componentDidMount = () => {
    axios.get("/getPosts").then(response => {
      this.setState ({
        stocks: response.data.sort((a,b) => a.shares + b.shares).slice(0,30)
      });
    });
  };

  render() {

    const expandRow = {
      renderer: row => (
        <Posts stock={row.stock} tickerList={this.state.stocks} />
      )
    };

    return (
      <BootstrapTable
        bootstrap4
        keyField="stock"
        pagination={ paginationFactory() }
        data={ this.state.stocks }
        columns={ columns }
        defaultSorted={ defaultSorted }
        filter={ filterFactory() }
        expandRow={ expandRow }
      />
    )
  }
}