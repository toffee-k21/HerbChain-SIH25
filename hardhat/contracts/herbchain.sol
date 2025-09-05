// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HerbChain {
    struct CollectionEvent {
        uint timestamp;
        string collectorId;
        string species;
        string location; // GPS as "lat,lng"
        uint initialQuality; // optional for prototype
    }

    struct ProcessingStep {
        uint timestamp;
        string facilityId;
        string step; // drying, grinding, storage
        string notes;
    }

    struct Product {
        string batchId;
        CollectionEvent collection;
        ProcessingStep[] processingSteps;
        uint quantity; // total items in batch
    }

    mapping(string => Product) public products;

    // --- Events ---
    event CollectionRecorded(string batchId);
    event ProcessingRecorded(string batchId, string step);

    // --- Functions ---
    function recordCollection(
        string memory batchId,
        string memory collectorId,
        string memory species,
        string memory location,
        uint initialQuality,
        uint quantity
    ) public {
        products[batchId].batchId = batchId;
        products[batchId].quantity = quantity;
        products[batchId].collection = CollectionEvent(
            block.timestamp,
            collectorId,
            species,
            location,
            initialQuality
        );
        emit CollectionRecorded(batchId);
    }

    function addProcessingStep(
        string memory batchId,
        string memory facilityId,
        string memory step,
        string memory notes
    ) public {
        products[batchId].processingSteps.push(
            ProcessingStep(block.timestamp, facilityId, step, notes)
        );
        emit ProcessingRecorded(batchId, step);
    }

    function getProduct(string memory batchId) public view returns (Product memory) {
        return products[batchId];
    }
}
