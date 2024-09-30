import '../Sass/HomeComponent.scss';
import PostStatus from './common/PostUpdate/PostStatus';

function HomeComponent({currentUser}) {
  return (
    <div>
      <div className='home-component'><PostStatus currentUser={currentUser} /></div>
    </div>
  )
}

export default HomeComponent;