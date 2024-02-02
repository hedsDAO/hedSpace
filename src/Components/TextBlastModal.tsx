import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input } from "@chakra-ui/react";

const TextBlastModal = ({ eventId }: {eventId: number}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value);

    const handleSend = () => {
        // Handle the message send action here
        console.log(`Sending message: ${message} for event ID: ${eventId}`);
        closeModal();
    };

    return (
        <>
            <Button onClick={openModal}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event ID: {eventId}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input 
                            placeholder="Type your message here" 
                            value={message} 
                            onChange={handleMessageChange} 
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSend}>
                            Send Message
                        </Button>
                        <Button variant="ghost" onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TextBlastModal;
 