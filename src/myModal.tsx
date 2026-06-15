
import NiceModal /*, { useModal }*/ from '@ebay/nice-modal-react';
// Define Props
interface MyModalProps {
  title: string;
}

const MyModal = NiceModal.create<MyModalProps>(({ title }) => {
const modal = NiceModal.useModal();

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
        justifyContent: 'center', alignItems: 'center'
      }}
      onClick={() => modal.hide() } // Close on backdrop click
    >
      <div 
        style={{ background: 'white', padding: '20px', borderRadius: '8px' }}
        onClick={e => e.stopPropagation()} // Prevent closing when clicking content
      >
        <h2>{title}</h2>
        <p>This is a simple modal!</p>
        <button onClick={() => modal.hide()}>Close</button>
      </div>
    </div>
  );
});

export default MyModal;