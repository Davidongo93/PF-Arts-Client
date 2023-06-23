import 'bootstrap/dist/css/bootstrap.min.css';
import style from './Buyer.module.css';
import { Accordion } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Buyer = () => {
  return (
    <div className={style['BuyerStyle']}>
      <NavLink className={style['BttBack']} to='/'>
        {' '}
        ← BACK{' '}
      </NavLink>
      <hr />
      <Accordion defaultActiveKey='0' flush>
        <Accordion.Item eventKey='0'>
          <Accordion.Header className={style['BttAcc']}>
            How can I start buying art and paintings?
          </Accordion.Header>
          <Accordion.Body>By browsing our gallery.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header className={style['BttAcc']}>
            What is the value of an artwork?
          </Accordion.Header>
          <Accordion.Body>
            The value of the products is related to the artists. However, an
            agreement can be reached if approved by the artist.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header className={style['BttAcc']}>
            What are the best ways to preserve and care for a painting?
          </Accordion.Header>
          <Accordion.Body>
            Remember that each artwork is unique and may require specific care
            depending on the type of painting, materials used, and its
            conservation status. It is always best to take precautions and seek
            professional guidance when necessary to ensure the painting remains
            in optimal condition in the long term.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='3'>
          <Accordion.Header className={style['BttAcc']}>
            What is the best way to hang and display a painting in my home?
          </Accordion.Header>
          <Accordion.Body>
            <span>Location selection:</span> Choose a suitable place to display
            the painting, considering lighting, wall size, and overall room
            decor.
            <br />
            <br />
            <span>Hanging height:</span> Hang the painting at a visually
            pleasing height, usually at eye level or slightly above eye level.
            Orientation and alignment: Ensure the painting is hung level and
            aligned with other elements in the room, such as furniture or
            architectural lines.
            <br />
            <br />
            <span>Orientation and alignment:</span> Ensure the painting is hung
            level and aligned with other elements in the room, such as furniture
            or architectural lines.
            <br />
            <br />
            <span>Proper mounting:</span> Use an appropriate hanging system
            based on the weight and size of the painting. You can use hooks,
            nails, or specific picture mounting systems.
            <br />
            <br />
            <span>Protection against damage:</span> Avoid hanging the painting
            in high-traffic areas or where it may be subject to accidental
            damage. Also, make sure it is kept away from heat sources, moisture,
            or direct sunlight.
            <br />
            <br />
            <span>Frame and mounting:</span> If you choose to frame the
            painting, select a frame that complements the artwork and provides
            proper protection. Use acid-free mounting materials that won't
            damage the painting.
            <br />
            <br />
            <span>Balanced distribution:</span> If planning to display multiple
            paintings on the same wall, ensure they are distributed in a
            balanced and harmonious manner, considering the spacing between
            them.
            <br />
            <br />
            <span>Periodic rotation:</span> To avoid excessive light exposure
            and reduce the risk of damage, consider periodically rotating
            displayed paintings with other artworks you may have.
            <br />
            <br />
            Remember, these are general tips that may vary depending on the
            specific painting and your personal preference. If you have doubts
            or concerns, it's always advisable to seek the opinion of an art or
            interior design professional.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='4'>
          <Accordion.Header className={style['BttAcc']}>
            How can I determine if an artwork has potential for future
            appreciation in value?
          </Accordion.Header>
          <Accordion.Body>
            <p>
              It will be evaluated based on the number of stars it has. The
              popularity will determine its potential.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='5'>
          <Accordion.Header className={style['BttAcc']}>
            Is it possible to buy art online securely?
          </Accordion.Header>
          <Accordion.Body>
            Yes, it is. However, caution should always be exercised.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='6'>
          <Accordion.Header className={style['BttAcc']}>
            Can I buy art directly from the artist?
          </Accordion.Header>
          <Accordion.Body>
            Yes, you can, but we are not responsible for any consequences that
            may arise.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default Buyer;
