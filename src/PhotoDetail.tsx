import './PhotoDetail.css';
import { Button } from 'react-aria-components';
</*import { ChevronLeft } from 'lucide-react';*/></>
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

  
    const { i18n,t } = useTranslation()
  
       const changeLanguage = (lang:string) =>
       {
         i18n.changeLanguage(lang)
       }

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
          <div className='navButtonDiv'>
            <h2 className='navButtonText'>Home <svg className="navSvg" version="1.0" viewBox="7.19731 8.79777 35.6995 32.299299999999995" id="svg2" xmlns="http://www.w3.org/2000/svg" width="35.6995" height="32.299299999999995">
  
  <g id="layer1">
    <path d="m25 9.0937l-17.719 16.281h5.563v15.531h24.312v-15.531h5.563l-17.719-16.281z" id="rect2879"/>
  </g>
  <metadata>
    
      
        image/svg+xml
        
        
        
          
            Openclipart
          
        
        home icon
        2008-05-26T21:12:21
        icon go home
        https://openclipart.org/detail/17103/home-icon-by-claudita
        
          
            claudita
          
        
        
          
            home
            home button
            home icon
            index icon
          
        
      
      
        
        
        
      
    
  </metadata>
</svg></h2>

                        <img className='rift' src='.\photos\IpadRift__AQUA.png'></img>
          </div>
        </Button>
        <div className="photo-info">
          {/*<span>{"TBA"}</span>*/}
        </div>
        <MenuTrigger>
  <Button className='hideButton' aria-label="Actions">
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
                  <img className='first fade-all-sides heightRestrict' src={src}  alt={photo.id || ''} style={{ '--width': photo.width, '--height': photo.height } as any} />
                  <h2 className="caption">{t("ALivingReconstructionOfThe")}  {t(photo.specimenName+".Name")}</h2><h2 className='artistCredit'>{t(photo.specimenName+".AristAtt")}</h2>
                </CarouselItem>
                <CarouselItem className="item" index={1}>
                  <img src={photo.photoAlive} className='fade-all-sides'/>
                  <h2 >{t("The")} {t(photo.specimenName+".Name")} {t("onDisplay")}</h2>
                </CarouselItem>
          {/*      <CarouselItem className="item" index={2}>
                  <img src="photos\rockwall.jpg" />
                  <h2>Location in wall</h2>
                </CarouselItem>
                */} 
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
          <h1 className={`${t(photo.specimenName+".TimePeriod")} factTitle`}>    {t(photo.specimenName+".ScientificName")}</h1>
          <h2 className='factSub'>{t(photo.specimenName+".NickName")}</h2>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.isThisADinoPic}></img>
            <div className='factInfo'>
              <p>{t(photo.specimenName+".IsDino")}</p>
              
              </div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite locationImg' src={photo.locationSvg}></img>
            <div className='factInfo'>
             <p> {t(photo.specimenName+".Location")} <span className={`${t(photo.specimenName+".TimePeriod")}`}>{t(photo.specimenName+".TimePeriodText")}</span> <span className={`${t(photo.specimenName+".TimePeriod2")}`}>{t(photo.specimenName+".TimePeriodText2")}</span></p>
              </div>
          </div>

          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.habitatSvg}></img>
            <div className='factInfo'>
              <p>{t(photo.specimenName+".Habitat")}</p>
              </div>
          </div>
{/* commented out for future use
          <div className='factSection'>
            <img className='factImg imgToWhite' src={photo.sizeSvg}></img>
            <div className='factInfo'>
              <p>{t(photo.specimenName+".Size")}</p>
              </div>
          </div>//
*/}
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


