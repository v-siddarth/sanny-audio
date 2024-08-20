import { InputBase, Box, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchedProducts } from '../../../redux/userHandle';

const Search = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        dispatch(getSearchedProducts("searchProduct", searchTerm));
        if (location.pathname !== "/ProductSearch") {
            navigate("/ProductSearch");
        }
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <SearchIconWrapper onClick={handleSearch}>
                <SearchIcon sx={{ color: "#fff", fontSize: 20 }} />
            </SearchIconWrapper>
        </SearchContainer>
    )
}

const SearchContainer = styled(Box)`
  border-radius: 15px; /* Adjusted for a smaller appearance */
  margin-left: 10px;
  width: 100%;
  max-width: 250px; /* Adjusted width */
  background: linear-gradient(45deg, #ff007f, #ff6f00);
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const SearchIconWrapper = styled(Box)`
  padding: 6px; /* Smaller padding */
  display: flex;
  align-items: center;
  background-color: #004e92;
  border-radius: 0 15px 15px 0; /* Adjusted to match the reduced height */
  cursor: pointer;
`;

const InputSearchBase = styled(InputBase)`
  font-size: 12px; /* Smaller font size */
  width: 100%;
  padding: 6px 12px; /* Further reduced padding */
  border: none;
  outline: none;
  background: #fff;
  color: #333;
`;

export default Search;
