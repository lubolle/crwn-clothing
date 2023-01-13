import './category-item.style.scss'

const CategoryItem = ({ category }) => {
    // props
    const { imageUrl, title } = category

    return (
        <div className='category-container'>
            <div
                className='background-image'
                style={{
                    // Estas comillas raras es para poder usar una varibale dentro de un string
                    backgroundImage: `url(${imageUrl})`
                }} />
            <div className='category-body-container'>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );

};

export default CategoryItem;