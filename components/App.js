var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'q1MLo0EO8pEkbEeimt8RaXsAHuttdlnt';

function searchGifPromisified(searchingText) {
    return new Promise (
        function(resolve, reject) {
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
            var xhr = new XMLHttpRequest(); // 3
            xhr.open('GET', url);
            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response); // Sukces
                } else {
                    reject(new Error(this.statusText)); // Dostaliśmy odpowiedź, ale jest to np 404
                }
            };
            xhr.send();
        }
    )
};


 /*   function(searchingText, callback) { // 1 
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        var xhr = new XMLHttpRequest(); // 3
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) { // 4
            var data = JSON.parse(xhr.responseText).data; // 5
            var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                }; // 6
                callback(gif); // 7
            }
        };
        xhr.send();
};*/


App = React.createClass({

    getInitialState: function() {
        return {
            loading: false, 
            gif: {}, 
            searchingText: ''};
      },
    /* 
    1. as props we got text and function
    2. construct url for giphy API
    3. xhr - ask server
    4. and if response is OK
    5. pack response.data to var data
    6. make gif out of data
    7. push object to callback function in props
    */
    getGif: function() {
        searchGifPromisified(searchingText)
            .then(response => console.log('Contents: ' + response))
            .catch(error => console.error('Something went wrong', error));
    },

    /* 
    method for return Search
    1. get written text
    2. signal: loading process started
    3. start loading gif
    4. when loading finished
        a. signal: loading process finished
        b. set the gif = loaded gif
        c. set the new state for searchingText
    5. bind to keep the context (getGif!=App)
    */
    handleSearch: function(searchingText) { // 1 
        this.setState({
          loading: true  // 2
        }); 
        this.getGif(searchingText, function(gif) { // 3
            this.setState({  // 4
                loading: false, // a
                gif: gif, // b
                searchingText: searchingText // c
          });
        }.bind(this)); // 5
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
                <p>Find gif on <a href={'http://giphy.com'}>giphy</a>. 
                Press enter to download next pictures.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }

});