const dataForge = require('data-forge');

exports = {
    computeAllMetrics: function(data){
    // Metrics to consider
    // 1. No of tickets closed
    let df = new dataForge.DataFrame(data);
    return {
      unresolvedCount: getUnresolvedCount(df),
      overdueCount: getOverdueCount(df),
      openTicketCount: getAllOpenTicketCount(df),
      unAssignedTicket: getAllUnassignedTickets(df),
      escalatedCount: getAllEscalatedTicketCount(df)
    }
  }
}

function getUnresolvedCount(df){
    let unresolvedTickets=  df.where(row => row['status'] < 4);
    return unresolvedTickets.count();
}
    
function getOverdueCount(df){
    let overdueCountdf = df.where(row =>( row['due_by'] && Date.parse(row['due_by']) < new Date() && row['status']< 4));
    return overdueCountdf.count();
}

function getAllOpenTicketCount(df){
    let openTicketCount = df.where(row => row['status'] == 2);
    return openTicketCount.count();
}

function getAllUnassignedTickets(df){
    let ticketDf = df.where(row => row['status'] == 2);
    return ticketDf.count();
}

function getAllEscalatedTicketCount(df){
    let ticketDf = df.where(row => row['is_escalated'] == true);
    return ticketDf.count();
}