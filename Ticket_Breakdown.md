# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

My current understanding is that, There are three tables, Agents (which stores agent id), Facilitites(stores facility id), Shifts Tables (which maps the shifts for a factility through facility id, and agent through agent id).
1. Introduce a new field 'agent_reference_id' as a varchar or string in the database.
2. Allow Facilities to assign this agent reference id to there agents through a dashboard where they upload or manage agents.
3. getShiftsByFacility function will now return the data as it is, just in metadata agents reference id stored by facility will also be available.
4. generateReport function will take shifts and when they render the report, instead of display agent id, show the agent reference id.
5. If in future, another function is to be created for passing agent reference id and generating the report for them. Agent id can be fetched internally via the agent reference id and then its applicable shifts can be fetched and all the required data for the report can also be fetched.