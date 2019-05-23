Search = React.createClass({

    getInitialState() {
        return {
            searchingText: ''
        }
    },

    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});
        // for communication child->parent
        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },

    // precise for onKeyUp that our key is enter
    handleKeyUp: function(event) {
        if (event.keyCode === 13) {
          // send data to parent
          this.props.onSearch(this.state.searchingText)
        }
    },

    render: function() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };
    
        // input is not html but react class
        return (
            <input className="app-input" type={'text'}
                // if change, do some actions defined in handleChange
                onChange={this.handleChange}
                placeholder={'ex. cat'}
                style={styles}
                value={this.state.searchTerm}
                // listener for finish pressing key
                onKeyUp={this.handleKeyUp}
                />
        )}
});