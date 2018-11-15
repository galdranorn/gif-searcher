var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'q1MLo0EO8pEkbEeimt8RaXsAHuttdlnt';


App = React.createClass({
    // 1. as props we got text and function
    getGif: function(searchingText, callback) { 
        // 2. construct url for giphy API
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        // 3. xhr - ask server
        var xhr = new XMLHttpRequest();   
        xhr.open('GET', url);
        xhr.onload = function() {
            // and if response is OK
            if (xhr.status === 200) {
            // 5. pack response.data to var data
               var data = JSON.parse(xhr.responseText).data; // 4.
            // 6. make git out of data 
               var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
            // 7. push object to callback function in props
                callback(gif);
            }
        };
        xhr.send();
    },


    // method for return Search
        // 1. get written text
    handleSearch: function(searchingText) {  
        this.setState({
        // 2. signal: loading process started
          loading: true  
        });
        //3. start loading gif
        this.getGif(searchingText, function(gif) {
        // 4. when loading finished
          this.setState({  
        // a. signal: loading process finished
            loading: false,
        // b. set the gif = loaded gif
            gif: gif,
        // c. set the new state for searchingText
            searchingText: searchingText 
          });
        // bind to keep the context (getGif!=App)
        }.bind(this));
      },
      

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>GIF searcher</h1>
                <p>Find gif on <a href='http://giphy.com'>giphy</a>. Press enter to download next pictures.</p>
            
            <Search 
                onSearch={this.handleSearch}
            />
            
            <Gif
                loading={this.state.loading}
                url={this.state.gif.url}
                sourceUrl={this.state.gif.sourceUrl}
            />

          </div>
        );
    }
});