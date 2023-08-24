/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {Box, Button, SimpleGrid, useForceUpdate} from '@chakra-ui/react';
import DevelopmentTable from '../dataTables/components/DevelopmentTable';
import {useEffect, useState} from "react";

export default function Settings() {
	let [tableDataDevelopment, setTableDataDevelopment] = useState([])
	useEffect(() => {
		const getDevelopmentTableData = () => {
			fetch('http://localhost:3006', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"uid": 2
				})
			}).then(response => {
				return response.json()
			}).then(data => {
				const responseTable = data.data
				let tableData: Object[] = []
				if (responseTable != null) {
					for (let i = 0; i < responseTable.length; i++) {
						let formatItem = responseTable[i].item
						formatItem["iid"] = responseTable[i].iid
						formatItem["amount"] = Number(formatItem["amount"]) / 100
						formatItem["unit"] = "dollars"
						formatItem["action"] = {"iid":responseTable[i].iid}
						tableData = [...tableData, formatItem]
					}
				}
				setTableDataDevelopment(()=>[...tableData])
			})
		}
		getDevelopmentTableData()
	}, [])
	// Chakra Color Mode
		return (
			<Box pt={{base: '130px', md: '80px', xl: '80px'}}>
				<SimpleGrid mb='20px' columns={{sm: 1, md: 1}} spacing={{base: '20px', xl: '20px'}}>
					{tableDataDevelopment.length > 0 && <DevelopmentTable tableData={tableDataDevelopment}/>}
					{tableDataDevelopment.length == 0 && <DevelopmentTable tableData={tableDataDevelopment}/>}
					{/*<CheckTable tableData={tableDataCheck} />
				<ColumnsTable tableData={tableDataColumns} />
				<ComplexTable tableData={tableDataComplex} />
				*/}
				</SimpleGrid>
			</Box>
		);
}
