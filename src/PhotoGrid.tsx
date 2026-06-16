import './PhotoGrid.css';
import {Autocomplete, Button, GridList, GridListItem, Input, SearchField, Size, Slider, SliderThumb, SliderTrack, useFilter, Virtualizer, WaterfallLayout} from 'react-aria-components';
import {MenuIcon, Move} from 'lucide-react';
import photos from './photos.json';
import {useLayoutEffect, useRef, useState} from 'react';
import {flushSync} from 'react-dom';
import { useEffect } from 'react';
import {MenuTrigger, Menu, MenuItem, MenuSection, Text} from './menu';
import {Ellipsis, FolderOpen} from 'lucide-react';
import {useTranslation} from 'react-i18next';


type Photo = typeof photos[0];

interface PhotoGridProps {
  photos: typeof photos,
  onAction: (photo: Photo) => void,
  toggleSidebar: () => void,
  hidden: boolean
}
export function PhotoGrid({photos, onAction, hidden, toggleSidebar}: PhotoGridProps) {
  let {contains} = useFilter({sensitivity: 'base'});
  let [size, setSize] = useState(300);
  useEffect(() => {
}, [size]);
  useLayoutEffect(() => {
    let media = matchMedia('(width < 500px)');
    setSize(media.matches ? 150 : 250);
    media.onchange = () => {
      setSize(media.matches ? 150 : 300);
    };
  }, []);

  
    const { i18n } = useTranslation()
  
       const changeLanguage = (lang:string) =>
       {
         i18n.changeLanguage(lang)
       }
  // Photos can be dragged to move between albums.

  return (
    <div className="layout" style={hidden ? {visibility: 'hidden', position: 'absolute'} : undefined}>
      <Autocomplete filter={contains} disableVirtualFocus>
        <div className="toolbar">
          <Button
            id="toggle-sidebar"
            onPress={toggleSidebar}
            className="toolbar-Button">
            <MenuIcon size={18} />
          </Button>
          <Slider
            aria-label="Photo size"
            className="toolbar-Slider"
            minValue={200}
            maxValue={300}
            step={10}
            value={size}
            onChange={setSize}>
            <SliderTrack>
              <SliderThumb />
            </SliderTrack>
          </Slider>
          <SearchField
            aria-label="Search"
            className="toolbar-SearchField">
            <Input placeholder="Search" />
          </SearchField>


<MenuTrigger>
  <Button aria-label="Actions">
    <Ellipsis size={18} />
  </Button>
  <Menu>
    <MenuSection>
      <MenuItem onClick={() => {changeLanguage('en'); window.location.reload(); }}>
        <FolderOpen />
        <Text slot="label">English</Text>
      </MenuItem>

            <MenuItem onClick={() => {changeLanguage('de'); window.location.reload();}}>
        <FolderOpen />
        <Text slot="label">German</Text>
      </MenuItem>
    </MenuSection>
  </Menu>
</MenuTrigger>


        </div>
        <Virtualizer layout={WaterfallLayout} layoutOptions={{minItemSize: new Size(size, size)}}>
          <GridList
            aria-label="Photos"
            items={photos}
            selectionMode="multiple"
            selectionBehavior="replace"
            layout="grid"
            className="photo-grid">
            {photo => <PhotoItem photo={photo} onAction={onAction} />}
          </GridList>
        </Virtualizer>
      </Autocomplete>
    </div>
  );
}

interface PhotoItemProps {
  photo: Photo,
  onAction: (key: Photo) => void
}

function PhotoItem({photo, onAction}: PhotoItemProps) {

  const {t} = useTranslation();
  let imgRef = useRef<HTMLImageElement | null>(null);
  return (
    <GridListItem
      id={photo.id}
      value={photo}
      textValue={photo.description //|| photo.username
        }
      className="photo-item"
      onAction={() => {
        // Transition to the detail view
        imgRef.current!.classList.add('photo-transition');
        document.startViewTransition(() => {
          imgRef.current!.classList.remove('photo-transition');
          flushSync(() => onAction(photo));
          //toggle off side with this spot


const element = document.getElementById("toggle-sidebar") as HTMLElement;
console.log(element);
if(element){
  element.style.display = "none";
}

          console.log("you just switched to grid view!");
                })
      }}>
      <div className="photo-container" style={{aspectRatio: `${photo.width}/${photo.height}`}}>
        <img ref={imgRef} alt={t(photo.specimenName+".Name") || ''} src={photo.urls.small} data-photo-id={photo.id} draggable={false} />
                <div className='photo-text-container'>        
          <h2>{t(photo.specimenName+".Name")}</h2>
          </div>
      </div>
      <Button slot="drag" className="drag-button">
        <Move size={16} />
      </Button>
    </GridListItem>
  );
}
