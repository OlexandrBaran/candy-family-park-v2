import styled from "styled-components";
import { FaArrowLeft } from 'react-icons/fa'


const Breadcrumbs = ({ category, setShowCategories }) => {

    return (
        <BreadcrumbsContent>
            <BreadcrumbsItem>
                <BreadcrumbsLink
                    onClick={() => {
                        setShowCategories(true)
                    }}
                ><FaArrowLeft style={{ verticalAlign: "bottom", paddingRight: "0.3em" }} />Назад до категорій</BreadcrumbsLink>
                <BreadcrumbsLink className="active" >{category}</BreadcrumbsLink>
            </BreadcrumbsItem>
        </BreadcrumbsContent>
    )
}

export default Breadcrumbs;

const BreadcrumbsContent = styled.div`
    padding:1em 1.2em;
    font-family: 'Ubuntu', sans-serif;  
    color:grey;
    font-weight:500;
    font-size:1em;
`

const BreadcrumbsItem = styled.ul`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:center;
`

const BreadcrumbsLink = styled.li`

    &:not(:last-of-type)::after{
        content:">";
        margin: 0.2em;
    }

    &.active{
        color:#28A745;
    }
`