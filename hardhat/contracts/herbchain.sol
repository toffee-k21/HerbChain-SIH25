// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HerbChain {
    enum StepType { Collection, Processing, Testing, Shipment, Retail }

    struct Step {
        StepType stepType;     // collection, processing, testing, shipment...
        uint timestamp;
        string actorId;        // collectorId, facilityId, labId, shipperId...
        string quality;        // free text or JSON (e.g. "purity=95%;moisture=7%")
        string location;       // GPS or facility code
        string action;         // e.g. "collected", "dried", "tested", "shipped"
        string details;        // extra notes / IPFS hash
    }

    struct Product {
        string batchId;
        string herbName;       // fixed for the batch
        uint quantity;         // fixed for the batch
        Step[] steps;          // lifecycle events
    }

    mapping(string => Product) private products;

    // --- Events ---
    event StepRecorded(string batchId, StepType stepType, string action);

    // --- Functions ---
    function recordCollection(
        string memory batchId,
        string memory herbName,
        uint quantity,
        string memory actorId,
        string memory quality,
        string memory location,
        string memory details
    ) public {
        require(products[batchId].steps.length == 0, "Batch already exists");

        // create product metadata
        products[batchId].batchId = batchId;
        products[batchId].herbName = herbName;
        products[batchId].quantity = quantity;

        // record collection step
        products[batchId].steps.push(
            Step(
                StepType.Collection,
                block.timestamp,
                actorId,
                quality,
                location,
                "collected",
                details
            )
        );

        emit StepRecorded(batchId, StepType.Collection, "collected");
    }

    function recordStep(
        string memory batchId,
        StepType stepType,
        string memory actorId,
        string memory quality,
        string memory location,
        string memory action,
        string memory details
    ) public {
        require(products[batchId].steps.length > 0, "Batch does not exist");

        products[batchId].steps.push(
            Step(
                stepType,
                block.timestamp,
                actorId,
                quality,
                location,
                action,
                details
            )
        );

        emit StepRecorded(batchId, stepType, action);
    }

    function getProduct(string memory batchId) public view returns (Product memory) {
        return products[batchId];
    }

    function getSteps(string memory batchId) public view returns (Step[] memory) {
        return products[batchId].steps;
    }
}
