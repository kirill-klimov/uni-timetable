import React, { useEffect, useRef, useState } from 'react';
import './Search.styles.scss';
import {LoupeIcon} from './Search.styles';
import { AnimatePresence, motion } from 'framer-motion';
import SearchResults from '../SearchResults/SearchResults';
import { useDispatch } from 'react-redux';
import { searchGroupStart } from '../../redux/group/group.actions';

const Search = () => {

  const [value, setValue] = useState('');
  const [searchResult, setSearchResult] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {

    const current = value.trim();
    if (!current.length) return;
    dispatch(searchGroupStart(current));

  }, [value]);

  const variants = {
    init: { x: 'calc(100% + 10px)' },
    enter: { x: 0 }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchGroupStart(value.trim()));
    inputRef.current.focus();
  }

  const inputRef = useRef(null);

  return (
    <div className="search-block">
      <AnimatePresence>
        {
          searchResult && value.trim().length ?
          <SearchResults />
          : null
        }
      </AnimatePresence>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <LoupeIcon />
          <input 
            ref={inputRef}
            value={value}
            onFocus={() => setSearchResult(true)}
            onBlur={() => setTimeout(() => setSearchResult(false), 150)}
            onChange={e => setValue(e.target.value)}
            className="search-bar__input"
            placeholder="Найти группу"
            type="text" />
          <AnimatePresence>
            {
              value.trim().length ?
              <>
              <motion.button
              onClick={() => setValue('')}
              variants={variants}
              initial="init"
              animate="enter"
              exit="init"
              type="button"
              className="search-bar__clear">✕</motion.button>
              {/* <motion.button
                variants={variants}
                initial="init"
                animate="enter"
                exit="init"
                className="search-bar__button"
                type="submit">
                  Поиск
              </motion.button> */}
              </>
              : null
            }
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

export default Search;