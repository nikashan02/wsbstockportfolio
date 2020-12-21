export default {
  search:function(flair, sortBy, timeFrame) {
    return fetch(`https://www.reddit.com/r/wallstreetbets/search.json?q=flair%3A${flair}&restrict_sr=1&t=${timeFrame}&sort=${sortBy}&limit=100`)
      .then(res => res.json())
      .then(data => data.data.children.map(data => data.data))
      .catch(err => console.log(err))
  },

  getComments:function(id){
    return fetch(`https://www.reddit.com/r/wallstreetbets/comments/${id}.json`)
      .then(res => res.json())
      .then(data => data[1].data.children.map(data => data.data))
      .catch(err => console.log(err))
  }
}