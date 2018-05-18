export default `
		<thead class="tbl-header">
		<th>Game</th><th>Released</th><th>By</th><th>Regions</th>
</thead>
<tbody class="tbl-content">
		<% for (var i = 0; i < this.length; i++) { %>
		<tr>
		<td>
	 <%= this[i].title %>
		</td>
		<td>
		<%= this[i].year %>
		</td>
		<td>
		<%=this[i].publisher%>
		</td>
		<td>
		<% this[i].regions.forEach((region)=>{ %>
		<%=region%>
		<% }) %>
		</td>
		</tr>
		<% } %>
		</tbody>
		`;
