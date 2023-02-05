import Topbar from './components/Topbar';
import RespondModal from './components/RespondModal';
import Footer from './components/Footer';
import Logo from './components/Logo';
import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';
import MenuPositionModal from "./components/MenuPositionModal";
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';



function App() {
  const { firestore } = useContext(Context)

  const [respondModalActive, setRespondModalActive] = useState(false)
  const [showCategories, setShowCategories] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [positionModalActive, setPositionModalActive] = useState(false)
  const [positionSelect, setPositionSelect] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [touchHeightStart, setTouchHeightStart] = useState(null)
  const [touchHeightEnd, setTouchHeightEnd] = useState(null)
  const [menuData, setMenuData] = useState([])
  const [categories, setCategories] = useState([])


  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50
  const minSwipeHeight = 18

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
    setTouchHeightStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
    setTouchHeightEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    const swipeHeight = touchHeightStart - touchHeightEnd
    if (Math.abs(swipeHeight) < minSwipeHeight) {
      if (!touchStart || !touchEnd) return
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > minSwipeDistance
      const isRightSwipe = distance < -minSwipeDistance
      if (isLeftSwipe || isRightSwipe) {
        if (isRightSwipe) {
          setShowCategories(true)
        }
        if (selectedCategory && isLeftSwipe) {
          setShowCategories(false)
        }

      }
    }
  }

  useEffect(() => {
    let categoriesContainers = [...document.getElementsByClassName("menu-category")]
    let category = categoriesContainers.filter(el => el.innerHTML === selectedCategory)
    if (showCategories && category[0]) {

      category[0].scrollIntoView({ block: "center" })
    }
    // eslint-disable-next-line  
  }, [showCategories]);

  useEffect(() => {
    firestore.collection('menuItems').get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        data.sort((a, b) => a.sequenceNumber - b.sequenceNumber)
        setMenuData(data)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  firestore.collection('categories').get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      }));
      data.sort((a, b) => a.sequenceNumber - b.sequenceNumber)
      setCategories(data)
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div className="App"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Topbar active={respondModalActive} setActive={setRespondModalActive} />
      <Logo />

      {
        showCategories && <MenuCategories setShowCategories={setShowCategories} setSelectedCategory={setSelectedCategory} categories={categories}/>
      }

      {
        !showCategories && <MenuItems setShowCategories={setShowCategories} selectedCategory={selectedCategory}
          setPositionModalActive={setPositionModalActive} setPositionSelect={setPositionSelect} showCategories={showCategories}
          menuData={menuData}
          />
      }

      <RespondModal active={respondModalActive} setActive={setRespondModalActive} />
      <MenuPositionModal active={positionModalActive} setActive={setPositionModalActive} positionSelect={positionSelect} />
      <Footer />
    </div>
  );
}

export default App;
