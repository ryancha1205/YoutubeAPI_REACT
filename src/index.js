import _ from 'lodash';
import React ,{Component}from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDcy0AexUWYjxPUlqWWr9KPOVWoVomZqr4';

// 클래스 기반 컴포넌트로 리팩토링할 때 중요해야 할 것은 this.props 로 값을 받는다.
class App extends Component{
 constructor(props){
    super(props);
    this.state={
      videos:[],
      selectedVideo:null
    };

      this.videoSearch('surfboards');
}

 videoSearch(term){
   YTSearch({key:API_KEY,term:term},videos=>{
     this.setState({
       videos:videos,
       selectedVideo:videos[0]
     });
   });
}

//from parent component to the child component
  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},500)


  return(
   <div>
      <SearchBar onSearchTermChange={videoSearch}/>
     
      <VideoDetail video={this.state.selectedVideo}/>
     
      <VideoList
      onVideoSelect={(selectedVideo)=>this.setState({selectedVideo})}
       videos={this.state.videos}/>
   </div>
 );
  }
}


ReactDOM.render(<App />,document.querySelector('.container'));
