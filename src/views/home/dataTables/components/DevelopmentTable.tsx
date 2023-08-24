import {Box, Flex, Icon, IconButton, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';
import {MdAddCircle, MdDelete, MdMode, MdRemoveCircle, MdResetTv} from "react-icons/md";
// Assets

type RowObj = {
	iid: number;
	product_name: string;
	category: any;
	amount: number;
	unit: number;
	action: any;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function DevelopmentTable(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const iconColor = useColorModeValue('secondaryGray.500', 'white');
	const iconButtonColor = useColorModeValue('brand.500', 'white');
	const dangerButtonColor = useColorModeValue('red.600', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	const bgList = useColorModeValue('white', 'whiteAlpha.100');
	const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
	const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	const bgHover = useColorModeValue({ bg: 'secondaryGray.400' }, { bg: 'whiteAlpha.50' });
	const bgFocus = useColorModeValue({ bg: 'white' }, { bg: 'whiteAlpha.100' });
	const deleteDevelopmentTableData = async (iid:Number) => {
		await fetch('http://localhost:3006/delete', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"iid": iid
			})
		}).then(response => {
			return response.json()
		}).then(responseData => {
			setData((data => data.filter((item)=>item.iid != responseData.data.iid)))
		})
	}
	const columns = [
		columnHelper.accessor('iid', {
			id: 'iid',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					IID
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('product_name', {
			id: 'uname',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NAME
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('category', {
			id: 'category',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Category
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
				</Flex>
			)
		}),
		columnHelper.accessor('amount', {
			id: 'amount',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Amount
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('unit', {
			id: 'unit',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Unit
				</Text>
			),
			cell: (info) => (
				<Flex align='center'>
					<Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
					{/*<Progress variant='table' colorScheme='brandScheme' h='8px' w='63px' value={info.getValue()} />*/}
				</Flex>
			)
		}),
		columnHelper.accessor('action', {
			id: 'action',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					Action
				</Text>
			),
			cell: (info) => (
				<Flex justifyContent='center' align='center'>
					<IconButton
						aria-label={"button"}
						alignItems='center'
						justifyContent='center'
						lineHeight='100%'
						borderRadius='10px'
						bg={bgList}
						_hover={bgHover}
						_focus={bgFocus}
						icon={<Icon as={MdMode} color={iconButtonColor} w='24px' h='24px' />}
					/>
					<IconButton
						aria-label={"button"}
						alignItems='center'
						justifyContent='center'
						lineHeight='100%'
						borderRadius='10px'
						bg={bgList}
						_hover={bgHover}
						_focus={bgFocus}
						onClick={() => deleteDevelopmentTableData(info.getValue().iid)}
						icon={<Icon as={MdDelete} color={dangerButtonColor} w='24px' h='24px' />}
					/>
					{/*
					<Text me='10px' color={textColor} fontSize='sm' fontWeight='700'>
						{info.getValue()}
					</Text>
					*/}
					{/*<Progress variant='table' colorScheme='brandScheme' h='8px' w='63px' value={info.getValue()} />*/}

				</Flex>
			)
		})
	];
	const [ data, setData ] = React.useState(() => [ ...tableData ]);
	// Preprocess the data before passing it to useReactTable
	const preprocessedData = data.map(item => {
		// Check if all required fields exist and format them if needed
		const formattedItem = {
		...item,
		iid: item.iid,
		product_name: item.item.uname,
		category: item.item.category,
		amount: Number(item.item.amount) / 100,
		unit: 'dollars',
		action: item.iid ? { iid: item.iid } : null,
		};
	
		return formattedItem;
	});
	const table = useReactTable({
		data: preprocessedData,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
		<Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
				<Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
					Development Table
				</Text>
				<Box>
					<Menu />
					<IconButton
						aria-label={"button"}
						alignItems='center'
						justifyContent='center'
						lineHeight='100%'
						borderRadius='10px'
						bg={bgList}
						_hover={bgHover}
						_focus={bgFocus}
						icon={<Icon as={MdAddCircle} color={iconButtonColor} w='24px' h='24px' />}
					/>
				</Box>
			</Flex>
			<Box>
				<Table variant='simple' color='gray.500' mb='24px' mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.slice(0, 11).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												borderColor='transparent'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Card>
	);
}
