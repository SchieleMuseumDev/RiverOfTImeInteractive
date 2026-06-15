import './PhotoDetail.css';
import { Button } from 'react-aria-components';
import { ChevronLeft } from 'lucide-react';
import photos from './photos.json';
import { flushSync } from 'react-dom';
import { useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';

import {MenuTrigger, Menu, MenuItem, MenuSection, Text,} from './menu';
import {Ellipsis, FolderOpen} from 'lucide-react';


import {
  Carousel,
  CarouselButton,
  CarouselItem,
  CarouselScroller,
  CarouselTab,
  CarouselTabs,
} from "react-aria-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
/*import NiceModal from '@ebay/nice-modal-react';*/


/*const openModal = () => {
  // No need to import MyModal component here
  NiceModal.show('my-modal', { name: 'John Doe' });
};*/



type Photo = typeof photos[0];
interface PhotoDetailProps {
  photo: Photo,
  onBack: () => void
}

export function PhotoDetail({ photo, onBack }: PhotoDetailProps) {

   const {t} = useTranslation();
  
    const { i18n } = useTranslation()
  
       const changeLanguage = (lang:string) =>
       {
         i18n.changeLanguage(lang)
       }

  console.log("you just did something!");
  let [src, setSrc] = useState(photo.urls.small);
  useEffect(() => {
    // Start with already loaded thumbnail and swap to larger size image when loaded
    let img = new Image();
    img.onload = () => setSrc(photo.urls.regular);
    img.src = photo.urls.regular;
  }, [photo.urls.regular]);


  return (
    <div className="layout">
      <div className="toolbar">
        <Button
          className="toolbar-Button"
          onPress={() => {

            const element = document.getElementById("toggle-sidebar") as HTMLElement;
console.log(element);
if(element){
  element.style.display = "inline";
}
            // Transition back to the grid view
            document.startViewTransition(async () => {
              flushSync(() => onBack());
              console.log("you just switched to grid view!");
              ///put sidebar back here!!!
              // Find corresponding photo in grid and mark it as transitioning.
              let el = document.querySelector('[data-photo-id="' + photo.id + '"]');
              el?.classList.add('photo-transition');
            }).ready.then(() => {
              let el = document.querySelector('[data-photo-id="' + photo.id + '"]');
              el?.classList.remove('photo-transition');
            });
          }}>
          <ChevronLeft size={18} style={{ display: 'block' }} />
        </Button>
        <div className="photo-info">
          {/*<span>{"TBA"}</span>*/}
        </div>
        <MenuTrigger>
  <Button aria-label="Actions">
    <Ellipsis size={18} />
  </Button>
  <Menu>
    <MenuSection>
      <MenuItem onClick={() => changeLanguage('en')}>
        <FolderOpen />
        <Text slot="label">English</Text>
      </MenuItem>

            <MenuItem onClick={() => changeLanguage('de')}>
        <FolderOpen />
        <Text slot="label">German</Text>
      </MenuItem>
    </MenuSection>
  </Menu>
</MenuTrigger>
      </div>


      <div className="photo-detail">
               {/*  <img className="fade-right" src={src} alt={photo.description || ''} style={{ '--width': photo.width, '--height': photo.height } as any} />

        </div>


        <div className="quickFacts">
          <h1>{photo.specimenName}</h1>
          <h2 className='factInfo'>{photo.scientificName}</h2>

          <div className='factSection'>
            <img className='factImg' src={photo.eraSvg}></img>
            <div className='factInfo'>{photo.album}</div>
          </div>

          <div className='factSection'>
            <img className='factImg' src={photo.locationSvg}></img>
            <div className='factInfo'>{photo.location}</div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.habitatSvg}></img>
            <div className='factInfo'>{photo.habitat}</div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.sizeSvg}></img>
            <div className='factInfo'>{photo.sizeText}</div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.dietSvg}></img>
            <div className='factInfo'>{photo.diet}</div>
          </div>

        </div>


        <div className="desc desc1">
          <h1>{photo.hookTitle}</h1>
          <button onClick={openModal}>Open Modal</button>
          <p>{photo.description}</p>        </div>

        <div className="aliveSec">
          <img className='wideImg' src={photo.photoAlive}></img>

        </div>
*/}

        <div className="locationInWall">

          <div className="pictureCarousel">

            <Carousel aria-label="Featured Collection" className="root" spaceBetweenItems="16px" loop="infinite">
              <div className="buttons">
                <CarouselButton className="button" data-dir="prev" dir="prev">
                  <FaChevronLeft />
                </CarouselButton>
              </div>

              <div className='picSection'>

                                <div className='fade-rightNew'></div>


              <CarouselScroller className="scroller">
                <CarouselItem className="item" index={0}>
                  <img className='first' src={src} alt={photo.description || ''} style={{ '--width': photo.width, '--height': photo.height } as any} />
                  <h2>Our Specimen</h2>
                </CarouselItem>
                <CarouselItem className="item" index={1}>
                  <img src={photo.photoAlive} />
                  <h2>The Living Specimen</h2>
                </CarouselItem>
                <CarouselItem className="item" index={2}>
                  <img src="src\photos\rockwall.jpg" />
                  <h2>Location in wall</h2>
                </CarouselItem>
              </CarouselScroller>
                            </div>
              <CarouselButton className="button buttonRight" dir="next" data-dir="next">
                <FaChevronRight />
              </CarouselButton>
              <CarouselTabs className="tabs">
                {(page) => <CarouselTab index={page.index} className="tab" />}
              </CarouselTabs>
            </Carousel>


          </div> 
          
          

          <div className="pictureCarousel skinnyCaro">

            <Carousel aria-label="Featured Collection" className="root" spaceBetweenItems="16px" loop="infinite" >
              <div className="buttons">
                <CarouselButton className="button" data-dir="prev" dir="prev">
                  <FaChevronLeft />
                </CarouselButton>
              </div>

              <div className='picSection'>


              <CarouselScroller className="scroller">
                <CarouselItem className="item" index={0}>
                  

                          <div className="quickFacts">
          <h1>{t(photo.specimenName+".Name")}</h1>
          <h2 className='factInfo'>{t(photo.specimenName+"ScientificName")}</h2>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.isThisADinoPic}></img>
            <div className='factInfo'>
              <p>{t(photo.specimenName+".IsDino")}</p>
              
              </div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.locationSvg}></img>
            <div className='factInfo'>
             <p> {t(photo.specimenName+".Location")}</p>
              </div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.habitatSvg}></img>
            <div className='factInfo'>
              <p>{t(photo.specimenName+".Habitat")}</p>
              </div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.sizeSvg}></img>
            <div className='factInfo'>
              <p>{t(photo.specimenName+".Size")}</p>
              </div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.dietSvg}></img>
            <div className='factInfo'>
             <p> {t(photo.specimenName+".Diet")}</p>
              </div>
          </div>

        </div>
                </CarouselItem>

                
                <CarouselItem className="item" index={1}>
                          <div className="desc desc1">
          <h1>{t(photo.specimenName+".FunFactTitle")}</h1>
          <p>{t(photo.specimenName+".FunFact")}</p>        </div>


                </CarouselItem>
              </CarouselScroller>
                            </div>
              <CarouselButton className="button buttonRight" dir="next" data-dir="next">
                <FaChevronRight />
              </CarouselButton>
              <CarouselTabs className="tabs">
                {(page) => <CarouselTab index={page.index} className="tab" />}
              </CarouselTabs>
            </Carousel>


          </div>
          


        </div>
      </div>
    </div>
  );
}


