import React from 'react';
import './SearchResults.styles.scss';
import {motion} from 'framer-motion';
import { connect, useDispatch } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { setCurrentGroup } from '../../redux/group/group.actions';

const SearchResults = ({ loading, searchResult }) => {

  const variants = {
    init: { y: "-15px", opacity: 0 },
    enter: { y: "15px", opacity: 1 },
  }

  const transition = { duration: 0.15 }

  const dispatch = useDispatch();

  return (
    <motion.div 
      variants={variants}
      transition={transition}
      initial="init"
      animate="enter"
      exit="init"
      className="search-result">

      {
        loading ?
        <motion.div transition={{delay: 0.5}} animate={{opacity: 1}} initial={{opacity: 0}}>
          <MoonLoader size="17px" color="var(--search-result-text)" />
        </motion.div>
        : null
      } 

      {
        searchResult ?
          searchResult.length !== 0 ?
            searchResult.map((group, index) => 
              <a 
              href="#" 
              tabIndex={index}
              key={group._id}
              onClick={() => dispatch(setCurrentGroup({...group}))}
              className="search-result__item">{group.name}</a> )
            : <small className="search-result__small">Группа не найдена</small>
          : <small className="search-result__small">Начните вводить...</small>
      }

    </motion.div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.group.loading,
  searchResult: state.group.searchResult
})

export default connect(mapStateToProps)(SearchResults);