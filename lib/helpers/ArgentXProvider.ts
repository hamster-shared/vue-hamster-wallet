// starknet

import { connect } from "@argent/get-starknet"
import type {WalletProvider} from "./provider";
import {Accounts} from "./provider";

export class ArgentXProvider  implements WalletProvider {

    public icon : string
    public name : string
    public version: string
    public chains : string[]
    public accounts: any[]
    public features: any
    public wallet: any

    constructor() {
        this.icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTE1IiBoZWlnaHQ9IjM2OSIgdmlld0JveD0iMCAwIDUxNSAzNjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8yMTYzXzMxMjI2KSI+CjxwYXRoIGQ9Ik0yODguNDAzIDYzLjkxNDhIMjA0Ljk3OUMyMDIuMTkyIDYzLjkxNDggMTk5Ljk1OCA2Ni4yOTU5IDE5OS44OTggNjkuMjU1NkMxOTguMjEyIDE1Mi40NSAxNTcuMjI0IDIzMS40MTEgODYuNjc0NSAyODcuMzRDODQuNDM0NyAyODkuMTE1IDgzLjkyNDQgMjkyLjQ1MSA4NS41NjE5IDI5NC44NTNMMTM0LjM3MiAzNjYuNTIxQzEzNi4wMzIgMzY4Ljk2IDEzOS4yNjcgMzY5LjUxMSAxNDEuNTQ1IDM2Ny43MTlDMTg1LjY1OCAzMzIuOTc3IDIyMS4xMzkgMjkxLjA2NiAyNDYuNjkxIDI0NC42MTJDMjcyLjI0MyAyOTEuMDY2IDMwNy43MjcgMzMyLjk3NyAzNTEuODQgMzY3LjcxOUMzNTQuMTE1IDM2OS41MTEgMzU3LjM1IDM2OC45NiAzNTkuMDEzIDM2Ni41MjFMNDA3LjgyMyAyOTQuODUzQzQwOS40NTggMjkyLjQ1MSA0MDguOTQ4IDI4OS4xMTUgNDA2LjcxIDI4Ny4zNEMzMzYuMTU5IDIzMS40MTEgMjk1LjE3MSAxNTIuNDUgMjkzLjQ4NyA2OS4yNTU2QzI5My40MjYgNjYuMjk1OSAyOTEuMTkxIDYzLjkxNDggMjg4LjQwMyA2My45MTQ4WiIgZmlsbD0iI0ZGODc1QiIvPgo8cGF0aCBkPSJNNDA1LjIwNCAxMTYuODVMMzk2LjEzMSA4OC44MTgyQzM5NC4yODUgODMuMTI3MSAzODkuNzkgNzguNjk0MiAzODQuMDY4IDc2Ljk0MTVMMzU1LjkgNjguMjgxNEMzNTIuMDEzIDY3LjA4NTQgMzUxLjk3MiA2MS41OTA0IDM1NS44NDggNjAuMzQzTDM4My44NzIgNTEuMjcwNEMzODkuNTYzIDQ5LjQyNTEgMzk0LjAwNyA0NC45MTk4IDM5NS43NiAzOS4yMDgxTDQwNC40MSAxMS4wNDIxQzQwNS42MDYgNy4xNDUwMiA0MTEuMTAyIDcuMTAzNyA0MTIuMzYgMTAuOTgwM0w0MjEuNDMzIDM5LjAxMjFDNDIzLjI3OCA0NC43MDMxIDQyNy43NzQgNDkuMTM2MyA0MzMuNDk2IDUwLjg5OTNMNDYxLjY2NCA1OS41NDlDNDY1LjU1MSA2MC43NDUxIDQ2NS41OTIgNjYuMjQwMSA0NjEuNzE2IDY3LjQ5NzlMNDMzLjY5MiA3Ni41NzA0QzQyOCA3OC40MDU0IDQyMy41NTcgODIuOTEwNyA0MjEuODA0IDg4LjYzMjdMNDEzLjE1MyAxMTYuNzg4QzQxMS45NTcgMTIwLjY4NSA0MDYuNDYyIDEyMC43MjcgNDA1LjIwNCAxMTYuODVaIiBmaWxsPSIjRkY4NzVCIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzkuODgyOCAxNTIuNjI4TDU5LjI4OTcgMTU5LjI5MkM1NS4xMTE0IDE2MC42NDkgNTEuODUzOCAxNjMuOTUxIDUwLjU2NzkgMTY4LjE1Mkw0NC4yMDU0IDE4OC44NDNDNDMuMzI5NSAxOTEuNjk4IDM5LjI5MjkgMTkxLjcyOCAzOC4zNzYgMTg4Ljg4TDMxLjcxMTcgMTY4LjI5OEMzMC4zNTQ5IDE2NC4xMTUgMjcuMDQ4OSAxNjAuODU0IDIyLjg1MiAxNTkuNTY0TDIuMTY1NjUgMTUzLjIxM0MtMC42OTY4ODQgMTUyLjMzMyAtMC43MzA0MzIgMTQ4LjI5NyAyLjExNzIgMTQ3LjM3MkwyMi43MDY2IDE0MC43MDhDMjYuODg4NiAxMzkuMzUxIDMwLjE0NjIgMTM2LjA0OSAzMS40Mzk2IDEzMS44NDhMMzcuNzk0NiAxMTEuMTU3QzM4LjY3MDUgMTA4LjMwMiA0Mi43MDcxIDEwOC4yNzIgNDMuNjMxNCAxMTEuMTJMNTAuMjk1OCAxMzEuNzAyQzUxLjY0NTEgMTM1Ljg4NSA1NC45NTExIDEzOS4xNDYgNTkuMTU1NSAxNDAuNDM2TDc5LjgzNDQgMTQ2Ljc5MUM4Mi42OTY5IDE0Ny42NjcgODIuNzMwNCAxNTEuNzAzIDc5Ljg4MjggMTUyLjYyOFoiIGZpbGw9IiMyODI4NkUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01MTQuNDMyIDI1Ny43MDVMNTA4LjkwNyAyNTkuNDkzQzUwNy43ODYgMjU5Ljg1NyA1MDYuOTEyIDI2MC43NDMgNTA2LjU2NyAyNjEuODdMNTA0Ljg2IDI2Ny40MjFDNTA0LjYyNSAyNjguMTg3IDUwMy41NDIgMjY4LjE5NSA1MDMuMjk2IDI2Ny40MzFMNTAxLjUwOCAyNjEuOTA5QzUwMS4xNDQgMjYwLjc4NyA1MDAuMjU3IDI1OS45MTIgNDk5LjEzMSAyNTkuNTY2TDQ5My41ODEgMjU3Ljg2MUM0OTIuODEzIDI1Ny42MjYgNDkyLjgwNCAyNTYuNTQzIDQ5My41NjggMjU2LjI5NUw0OTkuMDkyIDI1NC41MDdDNTAwLjIxNCAyNTQuMTQzIDUwMS4wODggMjUzLjI1NyA1MDEuNDM1IDI1Mi4xM0w1MDMuMTQgMjQ2LjU3OUM1MDMuMzc1IDI0NS44MTMgNTA0LjQ1OCAyNDUuODA1IDUwNC43MDYgMjQ2LjU2OUw1MDYuNDk0IDI1Mi4wOTFDNTA2Ljg1NSAyNTMuMjEzIDUwNy43NDMgMjU0LjA4OCA1MDguODcxIDI1NC40MzRMNTE0LjQxOSAyNTYuMTM5QzUxNS4xODcgMjU2LjM3NCA1MTUuMTk1IDI1Ny40NTcgNTE0LjQzMiAyNTcuNzA1WiIgZmlsbD0iIzI4Mjg2RSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE1Ny42OSA1Ljg1MjM0TDE1NC42NzcgNi43NDczNkMxNTQuMDY1IDYuOTI4MzYgMTUzLjU4OCA3LjM3MTM0IDE1My40IDcuOTM1MzRMMTUyLjQ2OSAxMC43MTEzQzE1Mi4zNDEgMTEuMDk0MyAxNTEuNzUgMTEuMDk4MyAxNTEuNjE2IDEwLjcxNjNMMTUwLjY0MSA3Ljk1NDM2QzE1MC40NDIgNy4zOTQzNiAxNDkuOTU4IDYuOTU2MzQgMTQ5LjM0NCA2Ljc4MzM0TDE0Ni4zMTcgNS45MzEzNUMxNDUuODk4IDUuODEzMzUgMTQ1Ljg5MyA1LjI3MTM1IDE0Ni4zMSA1LjE0NzM1TDE0OS4zMjMgNC4yNTMzNEMxNDkuOTM1IDQuMDcyMzQgMTUwLjQxMSAzLjYyOTM1IDE1MC42MDEgMy4wNjUzNUwxNTEuNTMxIDAuMjg5MzQ3QzE1MS42NTkgLTAuMDkzNjUzIDE1Mi4yNSAtMC4wOTc2NTc1IDE1Mi4zODUgMC4yODQzNDJMMTUzLjM2IDMuMDQ2MzRDMTUzLjU1NyAzLjYwNjM0IDE1NC4wNDIgNC4wNDQzNiAxNTQuNjU3IDQuMjE3MzZMMTU3LjY4MyA1LjA2OTM1QzE1OC4xMDIgNS4xODczNSAxNTguMTA3IDUuNzI5MzQgMTU3LjY5IDUuODUyMzRaIiBmaWxsPSIjOUZDNEYwIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTYuNjkgMjM3Ljg1MkwxMy42NzY4IDIzOC43NDdDMTMuMDY1MSAyMzguOTI4IDEyLjU4ODUgMjM5LjM3MSAxMi40MDAyIDIzOS45MzVMMTEuNDY5MyAyNDIuNzExQzExLjM0MDggMjQzLjA5NCAxMC43NTAxIDI0My4wOTggMTAuNjE2IDI0Mi43MTZMOS42NDA3OCAyMzkuOTU0QzkuNDQyNDggMjM5LjM5NCA4Ljk1ODA4IDIzOC45NTYgOC4zNDQxOCAyMzguNzgzTDUuMzE2NjggMjM3LjkzMUM0Ljg5Nzc4IDIzNy44MTMgNC44OTMzOCAyMzcuMjcxIDUuMzA5OTggMjM3LjE0N0w4LjMyMzE4IDIzNi4yNTNDOC45MzQ4OCAyMzYuMDcyIDkuNDExNDggMjM1LjYyOSA5LjYwMDg4IDIzNS4wNjVMMTAuNTMwNyAyMzIuMjg5QzEwLjY1OTIgMjMxLjkwNiAxMS4yNDk5IDIzMS45MDIgMTEuMzg1MSAyMzIuMjg0TDEyLjM2MDMgMjM1LjA0NkMxMi41NTc1IDIzNS42MDYgMTMuMDQxOSAyMzYuMDQ0IDEzLjY1NjggMjM2LjIxN0wxNi42ODMzIDIzNy4wNjlDMTcuMTAyMiAyMzcuMTg3IDE3LjEwNjYgMjM3LjcyOSAxNi42OSAyMzcuODUyWiIgZmlsbD0iIzlGQzRGMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIxNjNfMzEyMjYiPgo8cmVjdCB3aWR0aD0iNTE1IiBoZWlnaHQ9IjM2OC43NzQiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=='
        this.name = "ArgentX"
        this.version = '1.0.0'
        this.chains = []
        this.accounts = []
        this.features = {
            "standard:connect": {
                version: '1',
                connect: this.connect,
            },
            "standard:disconnect": {
                version: '1',
                disconnect: demo,
            },
            "standard:events": {
                version: '1',
                events: demo,
            },
            "standard:switchNetwork": {
                version: '1',
                switchNetwork: this.switchNetwork,
            },
            "sui:signAndExecuteTransactionBlock": {
                version: '1',
                signAndExecuteTransactionBlock: demo,
            },
        }
    }

    async connect(): Promise<Accounts> {
        const windowStarknet = await connect({
            include: ["argentX"],
        })

        const accounts: string[]|undefined = await windowStarknet?.enable({ starknetVersion: "v4" })

        if (accounts === undefined){
            return {
                "accounts": []
            }
        }
        this.wallet = windowStarknet
        return {
            "accounts": accounts.map((i: string) => {
                return {
                    "address": i
                }
            })
        }

    }

    async logout(): Promise<void> {
    }

    async switchNetwork(network_id: string): Promise<any> {
        console.log(network_id)
       throw new Error('not impl')
    }

    async getNetwork() {
        throw new Error('not impl')
    }

    getWallet() {
        return this.wallet
    }

}


function demo() {
    console.log('demo')
}
